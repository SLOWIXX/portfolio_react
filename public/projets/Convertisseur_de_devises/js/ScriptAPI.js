
async function TauxDevise() {


  
    const devise= document.querySelector('.Devise');
    const Fin= document.querySelector('.Fin');
    let nombre= document.querySelector('#amount');
    let resfinal= document.querySelector('.resultat');
    let montant = parseFloat(nombre.value);
    const response = await fetch('https://v6.exchangerate-api.com/v6/207e290d46da7d3d1b8ac4f5/latest/USD');
    const data = await response.json();
    console.log(data);

    for (let i in data.conversion_rates){
    devise.innerHTML += `<option value="${i}">${i}</option>`;
    }


    let Base = data;
    let choix2 = 'USD';
    let choix = 'USD';


    devise.addEventListener('change', async (e) => {
        choix = e.target.value;
        console.log(choix);
        const rep = await fetch(`https://v6.exchangerate-api.com/v6/07e290d46da7d3d1b8ac4f5/latest/${choix}`)
        Base = await rep.json();
        console.log(Base);
        afficher(montant, Base.conversion_rates[choix2], choix2, resfinal)

    });

     for (let i in data.conversion_rates){
    Fin.innerHTML += `<option value="${i}">${i}</option>`;
    }

      Fin.addEventListener('change', async (e) => {
        choix2 = e.target.value;
        console.log(Base.conversion_rates[choix2]);
        afficher(montant, Base.conversion_rates[choix2], choix2, resfinal)

    });




     nombre.addEventListener('input', function() {
        montant = parseFloat(nombre.value);
        afficher(montant, Base.conversion_rates[choix2], choix2, resfinal)

    })

    let swap = document.querySelector('.swap');
    swap.addEventListener ('click', async(e) =>{

        let trade = choix2;
        choix2 = choix;
        choix = trade;

        Fin.value = choix2;
        devise.value = choix;

        const rep = await fetch(`https://v6.exchangerate-api.com/v6/07e290d46da7d3d1b8ac4f5/latest/${choix}`)
        Base = await rep.json();

      afficher(montant, Base.conversion_rates[choix2], choix2, resfinal)

    
    });
    
       
}

TauxDevise();

function afficher(montant, taux, deviseAffiche, resfinal){
    resultat = montant* taux;
    resultat = resultat.toFixed(2);
    resfinal.innerHTML = `<p class="text-center">${resultat} ${deviseAffiche}</p>`;
        if (resultat == null || isNaN(resultat)){
            resfinal.innerHTML = `<p class="text-center">0.00 ${deviseAffiche}</p>`;
        }
}

