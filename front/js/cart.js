/** Afficher le panier*/
function Basket()
{

    let Products = JSON.parse(localStorage.getItem("sofa"));
     document.querySelector("#cart__items").innerHTML =""; 
     if(Products === null || Products.length === 0)
     {
         document.querySelector("#cart__items").innerHTML += `<p>Votre panier est vide.</p>`;
         document.querySelector('#totalQuantity').innerHTML = "0";  
        document.querySelector('#totalPrice').innerHTML= "0";
     } else 
        {
                    
            document.querySelector("#cart__items").innerHTML =""; 
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
                 Basket()
                
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
            if (key.quantityChooseProduct===0)
            {
                order = product.filter(item => item != key);
                localStorage.setItem("sofa", JSON.stringify(order));
                Basket();
            }else
            {
            order = product.filter(item => item = key);
            localStorage.setItem("sofa", JSON.stringify(order));
            Basket();
            //location.reload();
            }
        });
    }
}
modifItem()

 /*************************************************************************************************************************************************
  * FORMULAIRE & POST
 *************************************************************************************************************************************************/
//  /** *Récupérer le contenu du panier qui se trouve dans le localStorage */
//  const order = JSON.parse(localStorage.getItem("sofa"));
 
//  /** Stocker les ID des produits qui se trouve dans "order" (en parcourant le localStorage), vers un nouveau tableau "TabID" */
//  let tabID = order.map(sofa => sofa.idChooseProduct);
 
 
//  /** *Gestion du formulaire de commande - REGEX */
//  const firstname = document.querySelector('#firstName');
//  const lastname = document.querySelector('#lastName');
//  const address = document.querySelector('#address');
//  const city = document.querySelector('#city');
//  const email = document.querySelector('#email');
//  const emailWrong = document.querySelector('#emailErrorMsg');
//  const submitOrder = document.querySelector('#order');
 
//  /** Modifier l'attribue "pattern" des inputs type='text' avec "SetAttibue" pour ajouter des règles de contrôle */
//  firstname.setAttribute("pattern", "[a-zA-Z-éèà]*");
//  lastname.setAttribute("pattern", "[a-zA-Z-éèà]*");
//  city.setAttribute("pattern", "[a-zA-Z-éèà]*");
 
//  /** Aide pour saisie valide du formulaire */
 
//  // Validation du prénom
//  function verifFirstname (){
//  const inputFirstname = document.querySelector('#firstName');
//  const ErrorMsgFirstname = document.querySelector('#firstNameErrorMsg');
//  inputFirstname.addEventListener("change", () => {
//      if (inputFirstname.reportValidity()){
//          ErrorMsgFirstname.innerHTML=" ";
//          inputFirstname.style.backgroundColor = "#96e8c3";
//          inputFirstname.style.border = "none";    
//      }else
//      {
//          inputFirstname.style.backgroundColor = "white";
//          inputFirstname.style.border = " #e89696 solid ";
//          ErrorMsgFirstname.innerHTML=`Veillez saisir une chaine de caractères (a-zA-Z-éèà)`;
//      }
//  });
//  }
//  verifFirstname();
 
//  // Validation du nom
//  function verifLastname (){
//  const inputlastname = document.querySelector('#lastName');
//  const ErrorMsglastname = document.querySelector('#lastNameErrorMsg');
//  inputlastname.addEventListener("change", () => {
//      if (inputlastname.reportValidity()){
//          ErrorMsglastname.innerHTML=" ";
//          inputlastname.style.backgroundColor = "#96e8c3";
//          inputlastname.style.border = "none";
        
//      }else
//      {
//          inputlastname.style.backgroundColor = "white";
//          inputlastname.style.border = " #e89696 solid ";
//          ErrorMsglastname.innerHTML=`Veillez saisir une chaine de caractères (a-zA-Z-éèà)`;
//      }
//  })
//  }
//  verifLastname();
 
//  //validation du nom de la ville
//  function verifCity(){
//  const inputcity = document.querySelector('#city');
//  const cityMsglastname = document.querySelector('#cityErrorMsg');
//  inputcity.addEventListener("change", () => {
//      if (inputcity.reportValidity()){
//          cityMsglastname.innerHTML=" ";
//          inputcity.style.backgroundColor = "#96e8c3";
//          inputcity.style.border = "none";
        
//      }else
//      {
//          inputcity.style.backgroundColor = "white";
//          inputcity.style.border = " #e89696 solid ";
//          cityMsglastname.innerHTML=`Veillez saisir une chaine de caractères (a-zA-Z-éèà)`;
//      }
//  });
//  }
//  verifCity();
 
//  /** variable de validation : utiliser plusieurs fois */
//  let validation = true;
//  /** Envoyer la commande avec la méthode POST vers l'api avec données du formulaire et ID produit */
//  document.querySelector(".cart__order__form__submit").addEventListener("click", (e)=> {
//      e.preventDefault();
//      for(let input of document.querySelectorAll(".cart__order__form__question input")) {
//      validation &= input.reportValidity();
//          if (!validation) {
//              break;
//          } 
//      }   
//      if (validation) {
//          const result = fetch("http://localhost:3000/api/products/order", {
//              method: "POST",
//              headers: {
//                  'Content-Type': 'application/json'
//              },
//              body: JSON.stringify({
//                  // Ajouter les élements de contact du formulaire
//                  contact: {
//                      firstName: firstname.value,
//                      lastName: lastname.value,
//                      address: address.value,
//                      city: city.value,
//                      email: email.value
//                      },
//                  //Ajouter ID produit
//                  products : tabID
//              })
//          });
//          result.then(async (commande) => {
//              try {
//                  const myCommande = await commande.json();;
//                  // rediriger vers la page de confirmation en utilisant l'ID 
//                  window.location.href = `confirmation.html?id=${myCommande.orderId}`;
//                  // clear pour ne pas stocker ou conservé le numero de la commande 
//                  localStorage.clear();
//              } catch (e) {}
//          });
//      }
//  })