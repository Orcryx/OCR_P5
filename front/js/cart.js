//Récupérer les éléments du product en localStorage
function getProduct ()
{
    let order = JSON.parse(localStorage.getItem("sofa"));
     document.querySelector("#cart__items").innerHTML =""; 
     if(order === null || order.length === 0)
     {
         document.querySelector("#cart__items").innerHTML += `<p>Votre panier est vide.</p>`;
     } else 
            {
                return order;
            }
}
let Products = getProduct();



/** Afficher le panier*/
function Basket()
{
    let Objet = [];
    for(let i=0;i<Products.length;i++)
    {
        fetch(`http://localhost:3000/api/products/`)
            .then(product => product.json())
            .then(product =>
                { 
                    Objet = Products ;
                    let data = product.find(element => element._id === Objet[i].idChooseProduct);
                    Objet[i].price = data.price;
                    //console.log(Objet);
                    document.querySelector("#cart__items").innerHTML +=`
                                          <article class="cart__item" data-id="${Objet[i].idChooseProduct}" data-color="${Objet[i].colorChooseProduct}">
                                              <div class="cart__item__img">
                                                  <img src="${data.imageUrl}" alt="${data.altTxt}">
                                              </div>
                                              <div class="cart__item__content">
                                                  <div class="cart__item__content__description">
                                                      <h2>${data.name}</h2>
                                                      <p>${Objet[i].colorChooseProduct}</p>
                                                      <p>${Objet[i].price} €</p>
                                                  </div>
                                                  <div class="cart__item__content__settings">
                                                      <div class="cart__item__content__settings__quantity">
                                                          <p>Qté :</p>
                                                          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${Objet[i].quantityChooseProduct}">
                                                      </div>
                                                      <div class="cart__item__content__settings__delete">
                                                          <p class="deleteItem">Supprimer</p>
                                                      </div>
                                                  </div>
                                              </div>
                                       </article>`;
                    document.querySelector('#totalQuantity').innerHTML = calculNbArticle(Objet);  
                    document.querySelector('#totalPrice').innerHTML= PrixTotal(Objet);
                    deleteItem(Objet)
                    modifItem(Objet)
                })
    }
}
Basket()

/** Calculer le nombre de produit dans la commande */
function calculNbArticle (Products)
{
//console.log(Products)
let nbArticles = 0;
    for(let i=0; i<Products.length; i++)
    {
        nbArticles += Products[i].quantityChooseProduct;
    }
return nbArticles ;
}
//console.log('Il y a tant de produits dans la commande : ' + calculNbArticle (Products))


/** Calculer le prix total dans la commande */
 
 function PrixTotal (products)
 {
     let prix = 0;
     for(let i=0; i<products.length; i++)
     {
         prix += products[i].quantityChooseProduct * products[i].price ;
     }
 return prix;
 }
 
  /** Supprimer un élément du panier */
 function deleteItem(products)
 {
     let buttons = document.querySelectorAll('.deleteItem');
     for (let button of Array.from(buttons))
    {
         //console.log(buttons)
         button.addEventListener("click", (e) => {
                 let idKanap  = e.target.closest('article').getAttribute("data-id");
                 console.log(idKanap);
                 let colorKanap = e.target.closest('article').getAttribute("data-color"); 
                 console.log(colorKanap); 
                 // créer un tableau filtréer qui cherche en fonction d'élément présent dans order
                 let key = products.find(element => element.idChooseProduct === idKanap && element.colorChooseProduct == colorKanap);
                 console.log(key);
                 // filtrer l'item qui est égale à ma clé dans le localstorage et remplacer le tableau order par le tableau order filtré
                 let order = products.filter(item => item != key);
                 //écrir dans le localStorage : "sofa" prend la valeur de l'objet order devenu une chaine
                 localStorage.setItem("sofa", JSON.stringify(order));
                 // //Recharger la page pour actualiser l'affichage : voir pour trouver meilleure solution 
                 Basket();
             });
    }
}
deleteItem();

/** Modifier un élément */
function modifItem(product)
{
    let inputs = document.querySelectorAll('.itemQuantity');
    for(let newquantity of inputs){
        newquantity.addEventListener("change", (e) => 
        { 
            const idKanap  = e.target.closest('article').getAttribute("data-id");
            console.log(idKanap)
            const colorKanap = e.target.closest('article').getAttribute("data-color");
            console.log(colorKanap);     
            const key = product.find(element => element.idChooseProduct === idKanap && element.colorChooseProduct === colorKanap);
            console.log(key);
            key.quantityChooseProduct = parseInt(newquantity.value);
            order = product.filter(item => item = key);
            localStorage.setItem("sofa", JSON.stringify(order));
            //DisplayOrder ();
            //location.reload();
        });
    }
}
modifItem()