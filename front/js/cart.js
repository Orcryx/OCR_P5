/** *Récupérer le contenu du panier qui se trouve dans le localStorage */
let order = JSON.parse(localStorage.getItem("sofa"));
console.log(order);

/** Créer des tableaux pour accumuler les prix et quantités */
let totalPrice  = [];
let totalQuantity =[];

function displayOrder () {
    if(order === null || order.length === 0)
    {
        document.querySelector("#cart__items").innerHTML += `<p>Votre panier est vide.</p>`;
    } else {
/** Afficher le panier : parcourir tout le tableau de l'objet order */
for(i=0; i<order.length ; i++)
    {
        document.querySelector("#cart__items").innerHTML +=`
            <article class="cart__item" data-id="${order[i].idChooseProduct}" data-color="${order[i].colorChooseProduct}">
                    <div class="cart__item__img">
                        <img src="${order[i].imageChooseProduct}" alt="${order[i].altChooseProduct}">
                    </div>
                    <div class="cart__item__content">
                        <div class="cart__item__content__description">
                            <h2>${order[i].nameChooseProduct}</h2>
                            <p>${order[i].colorChooseProduct}</p>
                            <p>${order[i].prixChooseProduct * order[i].quantityChooseProduct} €</p>
                        </div>
                        <div class="cart__item__content__settings">
                            <div class="cart__item__content__settings__quantity">
                                <p>Qté :</p>
                                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${order[i].quantityChooseProduct}">
                            </div>
                            <div class="cart__item__content__settings__delete">
                                <p class="deleteItem">Supprimer</p>
                            </div>
                        </div>
                    </div>
              </article>`;
            
              /** Calculer les totaux avec la méthode reduce() + callback */
              const elementcalcul = (accumulator, currentValue) => accumulator + currentValue;

                /** Calculer la quantité de produit sélectionner dans le panier */
                let quantityOrder = parseInt(order[i].quantityChooseProduct);
                console.log('il y a tant de produit dans ma commande :' +quantityOrder);
                //pousser les quantités dans le tableau totalQuantity
                totalQuantity.push(quantityOrder);
                console.log(totalQuantity);
                // additionner les quantités avec la méthode reduce()
                const quantityArticle = totalQuantity.reduce(elementcalcul, 0);
                console.log('il y a ' + quantityArticle +' produit(s) dans cette commande');
                document.querySelector('#totalQuantity').innerHTML = quantityArticle ;

                /** Calculer le prix final sélectionner dans le panier */
                let priceTotal = parseInt(order[i].prixChooseProduct * order[i].quantityChooseProduct);
                console.log('le prix des produits est de : ' + priceTotal);
                //pousser les prix dans le tableau totalPrice
                totalPrice.push(priceTotal);
                console.log(totalPrice);
                // additionner les prix avec la méthode reduce()
                const priceOrder = totalPrice.reduce(elementcalcul, 0);
                console.log('le prix total de cette commande est de : ' + priceOrder);
                document.querySelector('#totalPrice').innerHTML= priceOrder;

    }
}
}
displayOrder ()


/** * Constante pour récupérer des données de construction de ma clé avec "data-"" */
const sofa = document.querySelector('.cart__item');
//console.log('je récupère data-id : ' + sofa.dataset.id);
//console.log('je récupère data-color : ' + sofa.dataset.color);

/** *Supprimer un article du panier */
function deleteItem(){
    let buttons = document.querySelectorAll('.deleteItem');
    for (let button of Array.from(buttons)){
        button.addEventListener("click", () => {
              // créer un tableau filtréer qui cherche en fonction d'élément présent dans order
            const key = order.find(element => element.idChooseProduct === sofa.dataset.id && element.colorChooseProduct == sofa.dataset.color);
            // filtrer l'item qui est égale à ma clé dans le localstorage et remplacer le tableau order par le tableau order filtré
            order = order.filter(item => item != key);
            //écrir dans le localStorage : "sofa" prend la valeur de l'objet order devenu une chaine
            localStorage.setItem("sofa", JSON.stringify(order));
            //Recharger la page pour actualiser l'affichage : voir pour trouver meilleure solution 
            window.location.reload();
           
        });
    }
  }
  deleteItem();

/** *Modifier un article du panier */
//   function modifProduct(){  
//     let inputs = document.querySelectorAll('.itemQuantity');
//     for(let newquantity of Array.from(inputs)){
//     newquantity.addEventListener("change", () => 
//     {
//         // créer un tableau filtréer qui cherche en fonction d'élément présent dans order
//         const key = order.find(element => element.idChooseProduct === sofa.dataset.id && element.colorChooseProduct == sofa.dataset.color);
//         // Modifier la valeur de quantité dans le tableau de key ou la recherche sur key est true - mettre value de l'input
//         key.quantityChooseProduct = parseInt(newquantity.value);
//         order = key;
//         localStorage.setItem("sofa", JSON.stringify(order));
//        // window.location.reload();
//     });
// }
// }
// modifProduct();

/** *Gestion du formulaire de commande - REGEX */

const firstname = document.querySelector('#firstName');
const lastname = document.querySelector('#lastName');
const address = document.querySelector('#address');
const city = document.querySelector('#city');
const email = document.querySelector('#email');
const emailWrong = document.querySelector('#emailErrorMsg');
const submitOrder = document.querySelector('#order');

/** Regex de validation du nom et prénom */
// const regexName = /^[a-z][a-z '-.,'];

/** Function de vérification du prénom */
// function firstnameValidation(firstname)
// {
    
// }




/** Vérification de l'adresse email */
// function emailValidation(email)
// {
//     const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//     if (emailRegex.test(email) === false)
//     {
//         emailWrong.innerHTML =`Veillez saisir une adresse mail valide : monadresse@mail.fr`
//         email.style.border = "thick solid red";
//         return false
//     }else
//         {
//             emailWrong.innerHTML = null;
//             return false
//         }   
// }

// function emailDisplayWrong ()
// {
//     email.addEventListener("change", () =>
//     {
//        return emailValidation(email);
//     });
// }