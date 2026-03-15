const database = {
    users: [
        // Utilisateur 1 : Ali (solde moyen, cartes actives, transactions normales)
        {
            id: "1",
            name: "Ali",
            email: "ali@example.com",
            password: "ali123",
            wallet: {
                balance: 12457,
                currency: "MAD",
                cards: [
                    {
                        numcards: "124847",
                        type: "visa",
                        balance: 14712,
                        expiry: "14-08-27",
                        vcc: "147",
                        status: "active",
                        limit: 20000
                    },
                    {
                        numcards: "124478",
                        type: "mastercard",
                        balance: 1470,
                        expiry: "14-08-28",
                        vcc: "257",
                        status: "active",
                        limit: 10000
                    }
                ],
                transactions: [
                    { id: "1", type: "credit", amount: 1400, date: "14-08-25", from: "Salaire", to: "124847", description: "Virement salaire" },
                    { id: "2", type: "debit", amount: 2000, date: "13-08-25", from: "124847", to: "Amazon", description: "Achat en ligne" },
                    { id: "3", type: "credit", amount: 2500, date: "12-08-25", from: "Anass", to: "124478", description: "Remboursement" },
                    { id: "4", type: "debit", amount: 500, date: "10-08-25", from: "124478", to: "Retrait ATM", description: "Retrait d'argent" }
                ]
            }
        },

        // Utilisateur 2 : Anass (solde élevé, cartes avec limites élevées, transactions fréquentes)
        {
            id: "2",
            name: "Anass",
            email: "anass@example.com",
            password: "anass123",
            wallet: {
                balance: 23340,
                currency: "MAD",
                cards: [
                    {
                        numcards: "283744",
                        type: "visa",
                        balance: 23344,
                        expiry: "14-06-27",
                        vcc: "453",
                        status: "active",
                        limit: 50000
                    },
                    {
                        numcards: "298437",
                        type: "mastercard",
                        balance: 43343,
                        expiry: "16-09-30",
                        vcc: "574",
                        status: "active",
                        limit: 75000
                    }
                ],
                transactions: [
                    { id: "1", type: "credit", amount: 3450, date: "15-08-25", from: "Client", to: "283744", description: "Paiement projet" },
                    { id: "2", type: "debit", amount: 4550, date: "12-07-25", from: "283744", to: "Apple Store", description: "Achat iPhone" },
                    { id: "3", type: "credit", amount: 10000, date: "15-06-25", from: "Entreprise", to: "298437", description: "Bonus annuel" },
                    { id: "4", type: "debit", amount: 2000, date: "10-06-25", from: "298437", to: "Netflix", description: "Abonnement" }
                ]
            }
        },

        // Utilisateur 3 : Youssef (solde faible, une carte bloquée, transactions limitées)
        {
            id: "3",
            name: "Youssef",
            email: "youssef@example.com",
            password: "youssef123",
            wallet: {
                balance: 850,
                currency: "MAD",
                cards: [
                    {
                        numcards: "384756",
                        type: "visa",
                        balance: 500,
                        expiry: "10-12-26",
                        vcc: "384",
                        status: "active",
                        limit: 5000
                    },
                    {
                        numcards: "394857",
                        type: "mastercard",
                        balance: 350,
                        expiry: "05-07-28",
                        vcc: "948",
                        status: "blocked", // Carte bloquée
                        limit: 3000
                    }
                ],
                transactions: [
                    { id: "1", type: "credit", amount: 1500, date: "20-09-25", from: "Saad", to: "384756", description: "Prêt remboursé" },
                    { id: "2", type: "debit", amount: 800, date: "18-09-25", from: "384756", to: "Marjane", description: "Courses" },
                    { id: "3", type: "debit", amount: 1200, date: "17-09-25", from: "394857", to: "Retrait ATM", description: "Retrait refusé (solde insuffisant)" }
                ]
            }
        },

        // Utilisateur 4 : Saad (solde négatif, transactions récurrentes, carte expirée)
        {
            id: "4",
            name: "Saad",
            email: "saad@example.com",
            password: "saad123",
            wallet: {
                balance: -1200,
                currency: "MAD",
                cards: [
                    {
                        numcards: "485936",
                        type: "visa",
                        balance: -500,
                        expiry: "11-03-23", // Carte expirée
                        vcc: "485",
                        status: "expired",
                        limit: 10000
                    },
                    {
                        numcards: "496047",
                        type: "mastercard",
                        balance: 700,
                        expiry: "08-10-29",
                        vcc: "960",
                        status: "active",
                        limit: 15000
                    }
                ],
                transactions: [
                    { id: "1", type: "debit", amount: 3000, date: "10-09-25", from: "485936", to: "Inwi", description: "Facture téléphone (découvert)" },
                    { id: "2", type: "credit", amount: 1800, date: "01-09-25", from: "Zakaria", to: "496047", description: "Remboursement" },
                    { id: "3", type: "debit", amount: 200, date: "25-08-25", from: "496047", to: "Spotify", description: "Abonnement mensuel" }
                ]
            }
        },

        // Utilisateur 5 : Yahya (solde moyen, transactions internationales)
        {
            id: "5",
            name: "Yahya",
            email: "yahya@example.com",
            password: "yahya123",
            wallet: {
                balance: 6500,
                currency: "MAD",
                cards: [
                    {
                        numcards: "586147",
                        type: "visa",
                        balance: 4000,
                        expiry: "02-05-26",
                        vcc: "586",
                        status: "active",
                        limit: 20000
                    },
                    {
                        numcards: "597258",
                        type: "mastercard",
                        balance: 2500,
                        expiry: "09-12-28",
                        vcc: "972",
                        status: "active",
                        limit: 15000
                    }
                ],
                transactions: [
                    { id: "1", type: "debit", amount: 1000, date: "12-08-25", from: "586147", to: "Booking.com", description: "Réservation hôtel (Europe)" },
                    { id: "2", type: "credit", amount: 3000, date: "10-08-25", from: "Alae", to: "597258", description: "Virement international" },
                    { id: "3", type: "debit", amount: 500, date: "05-08-25", from: "597258", to: "PayPal", description: "Paiement freelance" }
                ]
            }
        },

        // Utilisateur 6 : Alae (solde élevé, cartes premium, transactions professionnelles)
        {
            id: "6",
            name: "Alae",
            email: "alae@example.com",
            password: "alae123",
            wallet: {
                balance: 150000,
                currency: "MAD",
                cards: [
                    {
                        numcards: "687369",
                        type: "visa platinum",
                        balance: 100000,
                        expiry: "07-01-27",
                        vcc: "687",
                        status: "active",
                        limit: 200000
                    },
                    {
                        numcards: "698470",
                        type: "mastercard gold",
                        balance: 50000,
                        expiry: "04-08-30",
                        vcc: "984",
                        status: "active",
                        limit: 100000
                    }
                ],
                transactions: [
                    { id: "1", type: "credit", amount: 50000, date: "18-07-25", from: "Client Entreprise", to: "687369", description: "Paiement contrat" },
                    { id: "2", type: "debit", amount: 20000, date: "15-07-25", from: "687369", to: "Fournisseur", description: "Achat matériel" },
                    { id: "3", type: "credit", amount: 30000, date: "10-07-25", from: "Investissement", to: "698470", description: "Dividendes" }
                ]
            }
        },

        // Utilisateur 7 : Zakaria (solde variable, cartes avec limites basses)
        {
            id: "7",
            name: "Zakaria",
            email: "zakaria@example.com",
            password: "zakaria123",
            wallet: {
                balance: 9000,
                currency: "MAD",
                cards: [
                    {
                        numcards: "789580",
                        type: "visa electron",
                        balance: 6000,
                        expiry: "03-06-26",
                        vcc: "789",
                        status: "active",
                        limit: 8000
                    },
                    {
                        numcards: "790691",
                        type: "mastercard standard",
                        balance: 3000,
                        expiry: "12-03-29",
                        vcc: "906",
                        status: "active",
                        limit: 5000
                    }
                ],
                transactions: [
                    { id: "1", type: "debit", amount: 2500, date: "22-06-25", from: "789580", to: "Jumia", description: "Achat électroménager" },
                    { id: "2", type: "credit", amount: 2000, date: "20-06-25", from: "Youssef", to: "790691", description: "Prêt familial" },
                    { id: "3", type: "debit", amount: 1500, date: "15-06-25", from: "790691", to: "Retrait ATM", description: "Retrait urgent" }
                ]
            }
        }
    ]
};

// Fonctions utilitaires
const getUserById = (id) => database.users.find((user) => user.id === id);
const finduserbymail = (mail, password) => database.users.find((u) => u.email === mail && u.password === password);
const allUsers = database.users;

export default { finduserbymail, allUsers, getUserById };
