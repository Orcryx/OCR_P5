/** *Récupérer le contenu du panier qui se trouve dans le localStorage */
let order = JSON.parse(localStorage.getItem("sofa"));

/** Créer des tableaux pour accumuler les prix et quantités */
let totalPrice  = [];
let totalQuantity =[];

/** Afficher le contenu du panier :
 * Afficher le panier : parcourir tout le tableau[i] de l'objet order avec une boucle
 * Calculer les totaux avec la méthode reduce()
 * Modifier ou supprimer une quantité
 */

function DisplayOrder ()
{
    document.querySelector("#cart__items").innerHTML =""; 
    if(order === null || order.length === 0)
    {
        document.querySelector("#cart__items").innerHTML += `<p>Votre panier est vide.</p>`;
    } else 
            {
                for(i=0; i<order.length ; i++)
                {
                 let basket =
                    {
                        id : order[i].idChooseProduct,
                        couleur : order[i].colorChooseProduct,
                        quantite : order[i].quantityChooseProduct
                    }
               
                    fetch(`http://localhost:3000/api/products/`+ basket.id)
                    .then(product => product.json())
                    .then(data => 
                   {
                       document.querySelector("#cart__items").innerHTML +=`
                       <article class="cart__item" data-id="${basket.id}" data-color="${basket.couleur}">
                               <div class="cart__item__img">
                                   <img src="${data.imageUrl}" alt="${data.altTxt}">
                               </div>
                               <div class="cart__item__content">
                                   <div class="cart__item__content__description">
                                       <h2>${data.name}</h2>
                                       <p>${basket.couleur}</p>
                                       <p>${data.price} €</p>
                                   </div>
                                   <div class="cart__item__content__settings">
                                       <div class="cart__item__content__settings__quantity">
                                           <p>Qté :</p>
                                           <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${basket.quantite}">
                                       </div>
                                       <div class="cart__item__content__settings__delete">
                                           <p class="deleteItem">Supprimer</p>
                                       </div>
                                   </div>
                               </div>
                         </article>`;
               
                        /** CALCUL DU PANIER */
                         const elementcalcul = (accumulator, currentValue) => accumulator + currentValue;
                         /** Calculer la quantité de produit sélectionner dans le panier */
                         let quantityOrder = parseInt(basket.quantite);
                         //pousser les quantités dans le tableau totalQuantity
                         totalQuantity.push(quantityOrder);
                         // additionner les quantités avec la méthode reduce()
                         let quantityArticle = totalQuantity.reduce(elementcalcul, 0);
                         document.querySelector('#totalQuantity').innerHTML = quantityArticle ;
                   
                      
                         /** Calculer le prix final sélectionner dans le panier */
                         let priceTotal = parseInt(data.price * basket.quantite);
                         //pousser les prix dans le tableau totalPrice
                         totalPrice.push(priceTotal);
                         // additionner les prix avec la méthode reduce()
                         let priceOrder = totalPrice.reduce(elementcalcul, 0);
                         document.querySelector('#totalPrice').innerHTML= priceOrder;

                         /** *Supprimer un article du panier 
                        * Récupérer des données de construction de ma clé avec "data-""
                        * créer un tableau sur la base du résultat de recherche dataset
                        * pointer l'item qui est égale à ma clé dans le localstorage et remplacer le tableau order par le tableau order filtré
                        * Recharger la page pour actualiser l'affichage : voir pour trouver meilleure solution 
                        */
                        let buttons = document.querySelectorAll('.deleteItem');
                        for (let button of Array.from(buttons))
                        {
                            button.addEventListener("click", (e) => 
                            {
                                const idKanap  = e.target.closest('article').getAttribute("data-id");
                                const colorKanap = e.target.closest('article').getAttribute("data-color");  
                                const key = order.find(element => element.idChooseProduct === idKanap && element.colorChooseProduct === colorKanap);
                                order = order.filter(item => item != key);
                                localStorage.setItem("sofa", JSON.stringify(order));
                                //DisplayOrder ();
                                location.reload();
                                alert('Article(s) supprimé(s) du panier.');      
                            });
                        }

                        /** *Modifier un article du panier
                        * créer un tableau et trouver avec find() le bon canapé à modifier en fonction de son ID + couleur
                        * Modifier la valeur de quantité dans le tableau de key ou la recherche sur key est true - mettre value de l'input
                        * Supprimer le produit si la quantité est égale à zero et recharger
                        */
                        let inputs = document.querySelectorAll('.itemQuantity');
                        for(let newquantity of inputs){
                            newquantity.addEventListener("change", (e) => 
                            { 
                                const idKanap  = e.target.closest('article').getAttribute("data-id");
                                const colorKanap = e.target.closest('article').getAttribute("data-color");         
                                const key = order.find(element => element.idChooseProduct === idKanap && element.colorChooseProduct === colorKanap);
                                key.quantityChooseProduct = parseInt(newquantity.value);
                                if (key.quantityChooseProduct===0)
                                {
                                    order = order.filter(item => item != key);
                                    localStorage.setItem("sofa", JSON.stringify(order));
                                    location.reload();
                                }else
                                {
                                localStorage.setItem("sofa", JSON.stringify(order));
                                //DisplayOrder ();
                                location.reload();
                                }
                            });
                        }
                    })
                }
               
            }

}
DisplayOrder();

/** Stocker les ID des produits qui se trouve dans "order" (en parcourant le localStorage), vers un nouveau tableau "TabID" */
let tabID = order.map(sofa => sofa.idChooseProduct);


/** *Gestion du formulaire de commande - REGEX */
const firstname = document.querySelector('#firstName');
const lastname = document.querySelector('#lastName');
const address = document.querySelector('#address');
const city = document.querySelector('#city');
const email = document.querySelector('#email');
const emailWrong = document.querySelector('#emailErrorMsg');
const submitOrder = document.querySelector('#order');

/** Modifier l'attribue "pattern" des inputs type='text' avec "SetAttibue" pour ajouter des règles de contrôle */
firstname.setAttribute("pattern", "[a-zA-Z-éèà]*");
lastname.setAttribute("pattern", "[a-zA-Z-éèà]*");
city.setAttribute("pattern", "[a-zA-Z-éèà]*");

/** Aide pour saisie valide du formulaire */

// Validation du prénom
function verifFirstname (){
const inputFirstname = document.querySelector('#firstName');
const ErrorMsgFirstname = document.querySelector('#firstNameErrorMsg');
inputFirstname.addEventListener("change", () => {
    if (inputFirstname.reportValidity()){
        ErrorMsgFirstname.innerHTML=" ";
        inputFirstname.style.backgroundColor = "#96e8c3";
        inputFirstname.style.border = "none";    
    }else
    {
        inputFirstname.style.backgroundColor = "white";
        inputFirstname.style.border = " #e89696 solid ";
        ErrorMsgFirstname.innerHTML=`Veillez saisir une chaine de caractères (a-zA-Z-éèà)`;
    }
});
}
verifFirstname();

// Validation du nom
function verifLastname (){
const inputlastname = document.querySelector('#lastName');
const ErrorMsglastname = document.querySelector('#lastNameErrorMsg');
inputlastname.addEventListener("change", () => {
    if (inputlastname.reportValidity()){
        ErrorMsglastname.innerHTML=" ";
        inputlastname.style.backgroundColor = "#96e8c3";
        inputlastname.style.border = "none";
       
    }else
    {
        inputlastname.style.backgroundColor = "white";
        inputlastname.style.border = " #e89696 solid ";
        ErrorMsglastname.innerHTML=`Veillez saisir une chaine de caractères (a-zA-Z-éèà)`;
    }
})
}
verifLastname();

//validation du nom de la ville
function verifCity(){
const inputcity = document.querySelector('#city');
const cityMsglastname = document.querySelector('#cityErrorMsg');
inputcity.addEventListener("change", () => {
    if (inputcity.reportValidity()){
        cityMsglastname.innerHTML=" ";
        inputcity.style.backgroundColor = "#96e8c3";
        inputcity.style.border = "none";
       
    }else
    {
        inputcity.style.backgroundColor = "white";
        inputcity.style.border = " #e89696 solid ";
        cityMsglastname.innerHTML=`Veillez saisir une chaine de caractères (a-zA-Z-éèà)`;
    }
});
}
verifCity();

/** variable de validation : utiliser plusieurs fois */
let validation = true;
/** Envoyer la commande avec la méthode POST vers l'api avec données du formulaire et ID produit */
document.querySelector(".cart__order__form__submit").addEventListener("click", (e)=> {
    e.preventDefault();
    for(let input of document.querySelectorAll(".cart__order__form__question input")) {
    validation &= input.reportValidity();
        if (!validation) {
            break;
        } 
    }   
    if (validation) {
        const result = fetch("http://localhost:3000/api/products/order", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                // Ajouter les élements de contact du formulaire
                contact: {
                    firstName: firstname.value,
                    lastName: lastname.value,
                    address: address.value,
                    city: city.value,
                    email: email.value
                    },
                //Ajouter ID produit
                products : tabID
            })
        });
        result.then(async (commande) => {
            try {
                const myCommande = await commande.json();;
                // rediriger vers la page de confirmation en utilisant l'ID 
                window.location.href = `confirmation.html?id=${myCommande.orderId}`;
                // clear pour ne pas stocker ou conservé le numero de la commande 
                localStorage.clear();
            } catch (e) {}
        });
    }
})




