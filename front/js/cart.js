/** Afficher le panier
 * récupérer les informations du localStorage
 * Vérifier si on affiche ou non le panier
 * Récupérer le prix avec un fetch de API
 * Générer le panier et associer les functions de gestion des éléments du panier(modifier, supprimer, calculer)
*/
function Basket()
{

    let Products = JSON.parse(localStorage.getItem("sofa"));
    document.querySelector("#cart__items").innerHTML =""; 
    if(Products === null || Products.length === 0)
     {
        localStorage.clear();
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

let nbArticles = 0;
    for(let i=0; i<Products.length; i++)
    {
        nbArticles += Products[i].quantityChooseProduct;
    }
return nbArticles ;
}




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
        
         button.addEventListener("click", (e) => {
                 let idKanap  = e.target.closest('article').getAttribute("data-id");
                 let colorKanap = e.target.closest('article').getAttribute("data-color"); 
                 // créer un tableau filtréer qui cherche en fonction d'élément présent dans order
                 let key = products.find(element => element.idChooseProduct === idKanap && element.colorChooseProduct == colorKanap);
                 // filtrer l'item qui est égale à ma clé dans le localstorage et remplacer le tableau order par le tableau order filtré
                 let order = products.filter(item => item != key);
                 //écrir dans le localStorage : "sofa" prend la valeur de l'objet order devenu une chaine
                 localStorage.setItem("sofa", JSON.stringify(order));
                 // //Recharger la page pour actualiser l'affichage : voir pour trouver meilleure solution      
                 Basket()
                
             });
    }
}




/** Modifier un élément */
function modifItem(product)
{
    let inputs = document.querySelectorAll('.itemQuantity');
    for(let newquantity of inputs){
        newquantity.addEventListener("change", (e) => 
        { 
            const idKanap  = e.target.closest('article').getAttribute("data-id");
            const colorKanap = e.target.closest('article').getAttribute("data-color");     
            const key = product.find(element => element.idChooseProduct === idKanap && element.colorChooseProduct === colorKanap);
            let controlValue = newquantity.value;
            if(controlValue>100)
            {
                newquantity.value = 1;
                key.quantityChooseProduct = parseInt(newquantity.value);
            }else if(controlValue<1)
                        {
                            newquantity.value = 1;
                            key.quantityChooseProduct = parseInt(newquantity.value);
                        }else
                                {
                                    key.quantityChooseProduct = parseInt(newquantity.value);
                                }
                            
            let order = product.filter(item => item = key);
            localStorage.setItem("sofa", JSON.stringify(order));
            Basket();
        });
    }
}


 /*************************************************************************************************************************************************
  * FORMULAIRE & POST
 *************************************************************************************************************************************************/
function numeroOrder()
{
    const order = JSON.parse(localStorage.getItem("sofa"));
    if(order === null || order.length === 0)
    {
        console.log("le panier est vide");
    }
      /** Stocker les ID des produits qui se trouve dans "order" (en parcourant le localStorage), vers un nouveau tableau "TabID" */
      let tabID = order.map(sofa => sofa.idChooseProduct);
      return tabID;
}
let numero = numeroOrder();

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
 const ErrorMsgFirstname = document.querySelector('#firstNameErrorMsg');
 firstname.addEventListener("change", () => {
     if (firstname.reportValidity()){
         ErrorMsgFirstname.innerHTML=" ";
         firstname.style.backgroundColor = "#96e8c3";
         firstname.style.border = "none";    
     }else
     {
            firstname.style.backgroundColor = "white";
            firstname.style.border = " #e89696 solid ";
            ErrorMsgFirstname.innerHTML=`Veillez saisir une chaine de caractères (a-zA-Z-éèà)`;
     }
 });
 }
 verifFirstname();
 
 // Validation du nom
 function verifLastname (){
 const ErrorMsglastname = document.querySelector('#lastNameErrorMsg');
 lastname.addEventListener("change", () => {
     if (lastname.reportValidity()){
         ErrorMsglastname.innerHTML=" ";
         lastname.style.backgroundColor = "#96e8c3";
         lastname.style.border = "none";
        
     }else
     {
            lastname.style.backgroundColor = "white";
            lastname.style.border = " #e89696 solid ";
            ErrorMsglastname.innerHTML=`Veillez saisir une chaine de caractères (a-zA-Z-éèà)`;
     }
 })
 }
 verifLastname();
 
 //validation du nom de la ville
 function verifCity(){
 const ErrorcityMsg = document.querySelector('#cityErrorMsg');
 city.addEventListener("change", () => {
     if (city.reportValidity()){
            ErrorcityMsg.innerHTML=" ";
            city.style.backgroundColor = "#96e8c3";
            city.style.border = "none";
        
     }else
     {
            city.style.backgroundColor = "white";
            city.style.border = " #e89696 solid ";
            ErrorcityMsg.innerHTML=`Veillez saisir une chaine de caractères (a-zA-Z-éèà)`;
     }
 });
 }
 verifCity();

 function veriAddress()
 {
    const ErroraddressMsg = document.querySelector('#addressErrorMsg');
    address.addEventListener("change", ()=>
    {
        if(address.reportValidity())
        {
            ErroraddressMsg.innerHTML=" ";
            address.style.backgroundColor = "#96e8c3";
            address.style.border = "none";
        }else
        {
            address.style.backgroundColor = "white";
            address.style.border = " #e89696 solid ";
            ErroraddressMsg.innerHTML=`Veillez saisir une adresse pour la livraison de votre commande.`;
        }
    })
 }
 veriAddress()

 function veriMail()
 {
    const emailErrorMsg = document.querySelector('#emailErrorMsg');
    email.addEventListener("change", ()=>
    {
        if(email.reportValidity())
        {
            emailErrorMsg.innerHTML=" ";
            email.style.backgroundColor = "#96e8c3";
            email.style.border = "none";
        }else
        {
            email.style.backgroundColor = "white";
            email.style.border = " #e89696 solid ";
            emailErrorMsg.innerHTML=`Exemple "monmail@mail.fr".`;
        }
    })
 }
 veriMail()



 /** Envoyer la commande avec la méthode POST vers l'api avec données du formulaire et ID produit */
 function sendOrder()
 {
    /** variable de validation */
    let validation = true;
    document.querySelector(".cart__order__form__submit").addEventListener("click", (e)=> 
    {
     e.preventDefault();
        for(let input of document.querySelectorAll(".cart__order__form__question input")) 
        {
            validation &= input.reportValidity();
            if (!validation || order===null || order.length ===0) 
            {
                break;
            } 
        }   
        if (validation) 
        {
            const result = fetch("http://localhost:3000/api/products/order",
            {
                method: "POST",
                headers: 
                {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        // Ajouter les élements de contact du formulaire
                        contact: 
                        {
                            firstName: firstname.value,
                            lastName: lastname.value,
                            address: address.value,
                            city: city.value,
                            email: email.value
                        },
                    //Ajouter ID produit
                    products : numero
                })
            });
            result.then(async (commande) => 
            {
                try 
                {
                    const myCommande = await commande.json();;
                    // rediriger vers la page de confirmation en utilisant l'ID 
                    window.location.href = `confirmation.html?id=${myCommande.orderId}`;
                    // clear pour ne pas stocker ou conservé le numero de la commande 
                    localStorage.clear();
                } catch (e) {}
            });
        }
    })
 }
 sendOrder ()