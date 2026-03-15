import db from "../models/database.js";
const raw = localStorage.getItem('currentUser');

if (!raw) {
  document.location = "/src/view/login.html";
}

const users = db.allUsers;
const greetingName = document.getElementById('greetingName');
const availableBalance = document.getElementById('availableBalance');
const monthlyIncome = document.getElementById('monthlyIncome');
const monthlyExpenses = document.getElementById('monthlyExpenses');
const activeCards = document.getElementById('activeCards');
const quickTransferbtn = document.getElementById('quickTransfer');
const transfersection = document.getElementById('transfer-section');
const closeTransferBtn = document.getElementById('closeTransferBtn');
const bselect = document.getElementById('beneficiary');
const sourceCardSelect = document.getElementById('sourceCard');
const cancelTransferBtn = document.getElementById('cancelTransferBtn');
const submitTransferBtn = document.getElementById('submitTransferBtn');
const amount = document.getElementById('amount');
const instantTransfer = document.getElementById('instantTransfer');
const user = JSON.parse(raw);
const transferForm = document.getElementById('transferForm');
const wallet = user.wallet;

// Salutation
document.querySelector("#greetingName").textContent = user.name;
// Date du jour
document.querySelector("#currentDate").textContent = new Date().toLocaleDateString();
// Solde disponible
document.querySelector("#availableBalance").textContent = wallet.balance + " MAD";
// Revenus du mois
const income = wallet.transactions.filter(t => t.type === "credit").reduce((acc, t) => acc + t.amount, 0);
document.querySelector("#monthlyIncome").textContent = income + " MAD";
// Dépenses du mois
const expenses = wallet.transactions.filter(t => t.type === "debit").reduce((acc, t) => acc + t.amount, 0);
document.querySelector("#monthlyExpenses").textContent = expenses + " MAD";
// Nombre de cartes actives
document.querySelector("#activeCards").textContent = wallet.cards.length;

// Affichage des bénéficiaires
users.forEach(u => {
  if (u.id !== user.id) {
    let opt = document.createElement('option');
    opt.setAttribute('value', u.id);
    opt.textContent = u.name;
    bselect.appendChild(opt);
  }
});

// Affichage des cartes sources
user.wallet.cards.forEach(card => {
  let opt = document.createElement('option');
  opt.setAttribute('value', card.numcards);
  opt.textContent = `${card.type} (${card.balance} MAD)`;
  sourceCardSelect.appendChild(opt);
});

// Gestion des boutons
quickTransferbtn.addEventListener('click', () => transfersection.setAttribute('class', 'transfer-section'));
closeTransferBtn.addEventListener('click', () => transfersection.setAttribute('class', 'hidden'));
cancelTransferBtn.addEventListener('click', () => transfersection.setAttribute('class', 'hidden'));

// Fonction pour valider et recharger
const valider = () => {
  alert('Transaction validée !');
  localStorage.setItem('currentUser', JSON.stringify(user));
  const index = db.allUsers.findIndex(u => u.id === user.id);
  if (index !== -1) {
    db.allUsers[index] = user;
    localStorage.setItem('allUsers', JSON.stringify(db.allUsers));
  }
  window.location.reload();
};

// Fonction pour débiter l'expéditeur
const debiter = (expediteur, montant, carteNum, callback) => {
  expediteur.wallet.balance -= montant;
  const carte = expediteur.wallet.cards.find(card => card.numcards === carteNum);
  if (carte) carte.balance -= montant;
  callback();
};

// Fonction pour créditer le bénéficiaire
const crediter = (benefId, montant, callback) => {
  const beneficiaire = db.getUserById(benefId);
  if (beneficiaire) {
    beneficiaire.wallet.balance += montant;
    // Mettre à jour localStorage pour le bénéficiaire
    const index = db.allUsers.findIndex(u => u.id === benefId);
    if (index !== -1) {
      db.allUsers[index] = beneficiaire;
      localStorage.setItem('allUsers', JSON.stringify(db.allUsers));
    }
  }
  callback();
};

// Fonction pour créer une transaction de crédit (bénéficiaire)
const creerTC = (benefId, montant, carteExpediteur, callback) => {
  const beneficiaire = db.getUserById(benefId);
  if (beneficiaire) {
    const transaction = {
      id: Math.random().toString(),
      type: 'credit',
      amount: montant,
      date: new Date().toISOString().slice(0, 10),
      from: user.name,
      to: "Compte principal",
      description: `Transfert reçu de ${user.name}`
    };
    beneficiaire.wallet.transactions.push(transaction);
  }
  callback();
};

// Fonction pour créer une transaction de débit (expéditeur)
const creerTD = (benefId, montant, carteNum, callback) => {
  const beneficiaire = db.getUserById(benefId);
  const transaction = {
    id: Math.random().toString(),
    type: 'debit',
    amount: montant,
    date: new Date().toISOString().slice(0, 10),
    from: carteNum,
    to: beneficiaire ? beneficiaire.name : "Inconnu",
    description: `Transfert vers ${beneficiaire ? beneficiaire.name : "Inconnu"}`
  };
  user.wallet.transactions.push(transaction);
  callback();
};

// Vérifier le bénéficiaire
const verifyBen = (benefId, callback) => {
  if (db.getUserById(benefId)) callback();
  else alert("Bénéficiaire introuvable !");
};

// Vérifier le solde
const checkSolde = (montant, carteNum, callback) => {
  const carte = user.wallet.cards.find(card => card.numcards === carteNum);
  if (carte && carte.balance >= montant) callback();
  else alert("Solde insuffisant sur cette carte !");
};

// Fonction principale pour effectuer un transfert
const effectuerTransfert = (benefId, montant, carteNum, estInstantane, callback) => {
  const montantTotal = estInstantane ? montant + 13.4 : montant;

  // 1. Vérifier le solde
  checkSolde(montantTotal, carteNum, () => {
    // 2. Vérifier le bénéficiaire
    verifyBen(benefId, () => {
      // 3. Créer la transaction de crédit (bénéficiaire)
      creerTC(benefId, montant, carteNum, () => {
        // 4. Créer la transaction de débit (expéditeur)
        creerTD(benefId, montantTotal, carteNum, () => {
          // 5. Débiter l'expéditeur
          debiter(user, montantTotal, carteNum, () => {
            // 6. Créditer le bénéficiaire
            crediter(benefId, montant, () => {
              // 7. Valider et recharger
              callback();
            });
          });
        });
      });
    });
  });
};

// Gestion du formulaire de transfert
transferForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const benefId = bselect.value;
  const carteNum = sourceCardSelect.value;
  const montant = parseFloat(amount.value);
  const estInstantane = instantTransfer.checked;

  // Désactiver le bouton et simuler les étapes
  submitTransferBtn.disabled = true;
  submitTransferBtn.textContent = "Vérification...";

  setTimeout(() => {
    submitTransferBtn.textContent = "Traitement du bénéficiaire...";
    setTimeout(() => {
      submitTransferBtn.textContent = "Création des transactions...";
      setTimeout(() => {
        effectuerTransfert(benefId, montant, carteNum, estInstantane, () => {
          submitTransferBtn.textContent = "Validation...";
          setTimeout(valider, 1000);
        });
      }, 1000);
    }, 1000);
  }, 1000);
});

// Affichage des transactions récentes
const recentTransactionsList = document.querySelector("#recentTransactionsList");
recentTransactionsList.innerHTML = "";

const transactions = user.wallet.transactions.slice(-5).reverse();
transactions.forEach(t => {
  const div = document.createElement("div");
  div.className = "transaction-item";
  div.innerHTML = `
    <div>
      <strong>${t.type === "debit" ? "Envoi" : "Réception"}</strong>
      <p>${t.to}</p>
      <small>${t.date}</small>
      ${t.description ? `<p>${t.description}</p>` : ''}
    </div>
    <div>
      <span style="color:${t.type === "debit" ? "red" : "green"}">
        ${t.type === "debit" ? "-" : "+"}${t.amount} MAD
      </span>
    </div>
  `;
  recentTransactionsList.appendChild(div);
});
