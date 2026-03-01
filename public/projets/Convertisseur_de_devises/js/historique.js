const submitBtn = document.getElementById("submitBtn");
const valeur = document.getElementById("amount");
const resultDiv = document.querySelector(".btn.primary");
const selectDevise = document.getElementById('from');
const selectDevise2 = document.getElementById('to');

submitBtn.addEventListener("click", function (e) {
    e.preventDefault();
    const valeurUser = valeur.value;
    const deviseChoisie = selectDevise.value;
    const deviseChoisie2 = selectDevise2.value;
    const resultText = resultDiv.textContent;

    if (valeurUser === "" || valeurUser <= 0) {
    } else {
        enregister(valeurUser, deviseChoisie, deviseChoisie2, resultText);
    }
});

function enregister(valeurUser, deviseChoisie, deviseChoisie2, resultText) {
    let historique = JSON.parse(localStorage.getItem("historique")) || [];
    const date = new Date().toLocaleDateString();
    historique.push({ valeur: valeurUser, devise: deviseChoisie, devise2: deviseChoisie2, resultat: resultText, date: date });
    localStorage.setItem("historique", JSON.stringify(historique));
    afficherHistorique();
}


document.querySelector(".history-container").addEventListener("click", function(e) { 
    if (e.target.closest(".red-hover")) { 
        const historyItem = e.target.closest(".history-list"); 
        const index = historyItem.getAttribute("data-index"); 
        const historique = JSON.parse(localStorage.getItem("historique")) || []; 
        historique.splice(index, 1); 
        localStorage.setItem("historique", JSON.stringify(historique));
        afficherHistorique();

    }})


function afficherHistorique() {
    const historique = JSON.parse(localStorage.getItem("historique")) || [];
    const entryDiv = document.querySelector(".history-container");
    entryDiv.innerHTML = ""; 
    historique.forEach(entry => {
        entryDiv.innerHTML += `
        
           <div class="history-list">
                <div>
                    <p class="texte">${entry.valeur} ${entry.devise} = ${entry.resultat}</p>
                </div>
                <div class="flex">
                <p class="texte">${entry.date}</p>
                    <svg width="18" class="red-hover" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path class="red-hover" fill-rule="evenodd" clip-rule="evenodd" d="M3.774 3.4L4.586 17.048C4.59823 17.2514 4.68761 17.4425 4.8359 17.5822C4.9842 17.722 5.18023 17.7999 5.384 17.8H12.616C12.8198 17.7999 13.0158 17.722 13.1641 17.5822C13.3124 17.4425 13.4018 17.2514 13.414 17.048L14.226 3.4H3.774ZM15.429 3.4L14.612 17.119C14.5817 17.6279 14.3582 18.1059 13.9872 18.4555C13.6162 18.8051 13.1258 18.9999 12.616 19H5.384C4.87425 18.9999 4.38377 18.8051 4.01279 18.4555C3.64182 18.1059 3.41833 17.6279 3.388 17.119L2.571 3.4H0.5V2.7C0.5 2.56739 0.552679 2.44021 0.646447 2.34645C0.740215 2.25268 0.867392 2.2 1 2.2H17C17.1326 2.2 17.2598 2.25268 17.3536 2.34645C17.4473 2.44021 17.5 2.56739 17.5 2.7V3.4H15.429ZM11 0C11.1326 0 11.2598 0.0526785 11.3536 0.146447C11.4473 0.240215 11.5 0.367392 11.5 0.5V1.2H6.5V0.5C6.5 0.367392 6.55268 0.240215 6.64645 0.146447C6.74021 0.0526785 6.86739 0 7 0H11ZM6.5 6H7.7L8.2 15H7L6.5 6ZM10.3 6H11.5L11 15H9.8L10.3 6Z" fill="white"/>
                    </svg>
                </div>
            </div>
            
        `;

    });
}





const clearBtn = document.getElementById("clearBtn")

clearBtn.addEventListener("click", function() {
    console.log("bouton presse")
    let historique = JSON.parse(localStorage.getItem("historique")) || [];
    historique = [];
    localStorage.setItem("historique", JSON.stringify(historique));
    afficherHistorique();
})

afficherHistorique();


