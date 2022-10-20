/** *Récupérer le contenu du panier qui se trouve dans le localStorage */
let order = JSON.parse(localStorage.getItem("sofa"));
console.log(order);


/** Afficher le panier */
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
                                <p class="deleteItem" canapeId="${order[i].idChooseProduct}" canapeColor="${order[i].colorChooseProduct}">Supprimer</p>
                            </div>
                        </div>
                    </div>
              </article>`;
    }
   
   
/***Supprimer un élément dans le localStorage via le HTML et supprimer l'occurence dans le panier + reload page */
    function deleteItem() {
        let buttons = document.querySelectorAll('.deleteItem');
        for (let button of Array.from(buttons)){
            button.addEventListener("click", e => {
                let canapeId = e.target.getAttribute("canapeId");
                let canapeColor = e.target.getAttribute("canapeColor");
                const searchDeleteItem = order.find(element => element.idChooseProduct == canapeId && element.colorChooseProduct == canapeColor);
                order = order.filter(item => item != searchDeleteItem);
                localStorage.setItem("sofa", JSON.stringify(order));
                window.location.href = "cart.html";
            })
        }
      }
      
      deleteItem();

    // document.querySelector(".deleteItem").addEventListener('click', () =>{

    //    let products = JSON.parse(localStorage.getItem('sofa'));
    //    //console.log(products);
    //    //let variable de controle id + couleur
    //    let newproducts = products.filter(p);
    //    localStorage.setItem('sofa', JSON.stringify(newproducts))
    //    //appeler la fonction d'affichage des produits avec les nouvelles données
       
    // });

// function modifProduct()
// {
//     let quantityOrder = document.querySelector('.itemQuantity');

//     quantityOrder.addEventListener('change', () => 
//     {
        
//     });
// }