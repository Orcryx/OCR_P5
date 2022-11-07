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
                    //console.log(Objet);
                    let data = product.find(element => element._id === Objet[i].idChooseProduct);
                    //console.log(data);

                    if(Objet[i].idChooseProduct = data._id);
                    { 
                        //console.log("mon prix : " + data.price);
                        Objet[i].price = data.price;
                        console.log(Objet)
                        //return Objet;
                    }
                
                })

    }
}
produitComplet()

// let myProduct = produitComplet()
// console.log(myProduct)

/** Calculer le prix total dans la commande */
//  function PrixTotal (prices)
//  {
//     console.log(prices);
//      let prix = 0;
//      for(let i=0; i<prices.length; i++)
//      {
//          prix += prices[i];
//      }
//  return prix;
//  }
//  console.log(PrixTotal(prices));
 