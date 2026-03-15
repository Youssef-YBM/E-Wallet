import db from "../models/database.js";

const mailInput    = document.getElementById("mail");
const passwordInput = document.getElementById("password");
const submitBtn    = document.getElementById("submitbtn");

submitBtn.addEventListener("click", () => {
   
  
    const email    = mailInput.value;
    const password = passwordInput.value;
  
    // Validation basique
    if (!email || !password) {
      alert("Veuillez remplir tous les champs.");
      return;
    }
    
    submitBtn.textContent = "Connexion en cours...";
    setTimeout(() => {
        const user = db.finduserbymail(email, password);
  
    if (!user) {
      alert("Email ou mot de passe incorrect.");
      submitBtn.textContent = "Se connerter";
      return;
    }
   
  
    // Stocker l'utilisateur en session et rediriger vers le dashboard
    localStorage.setItem('currentUser',JSON.stringify(user));
    document.location = "/src/view/dashboard.html";
    },2000);
  });