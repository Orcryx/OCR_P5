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



/** Trouver les prix unitaire */
function produitComplet()
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

                    document.querySelector('#totalQuantity').innerHTML = calculNbArticle(Objet);  
                    document.querySelector('#totalPrice').innerHTML= PrixTotal(Objet);
                })
            
    }
}
produitComplet()

/** Calculer le nombre de produit dans la commande */
function calculNbArticle (Products)
{
console.log(Products)
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
 