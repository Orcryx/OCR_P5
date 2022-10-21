/** *Récupérer le contenu du panier qui se trouve dans le localStorage */
let order = JSON.parse(localStorage.getItem("sofa"));
console.log(order);

// function displayOrder () {
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
    }
// }
// displayOrder ()

/** * Constante pour récupérer des données de construction de ma clé */
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
            window.location.href = "cart.html";
           
        });
    }
  }
  deleteItem();

  function modifProduct(){  
    let inputs = document.querySelectorAll('.itemQuantity');
    for(let newquantity of Array.from(inputs)){
    newquantity.addEventListener("change", () => 
    {
        // créer un tableau filtréer qui cherche en fonction d'élément présent dans order
        const key = order.find(element => element.idChooseProduct === sofa.dataset.id && element.colorChooseProduct == sofa.dataset.color);
        // Modifier la valeur de quantité dans le tableau de key ou la recherche sur key est true - mettre value de l'input
        key.quantityChooseProduct = parseInt(newquantity.value);
        order = key;
        localStorage.setItem("sofa", JSON.stringify(order));
        window.location.href = "cart.html";
    });
}
}
modifProduct()