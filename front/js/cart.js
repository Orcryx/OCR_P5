/** *Récupérer le contenu du panier qui se trouve dans le localStorage */
let order = JSON.parse(localStorage.getItem("sofa"));
console.log(order);

/** Afficher le panier */

function displayOrder(order)
{
    for(i=0; i<order.length ; i++)
    {
        document.querySelector("#cart__items").innerHTML +=`
            <article class="cart__item" data-id="${order[i].idChooseProduct}" data-color="${order[i].colorChooseProduct}">
                    <div class="cart__item__img">
                        <img src="../images/product01.jpg" alt="Photographie d'un canapé">
                    </div>
                    <div class="cart__item__content">
                        <div class="cart__item__content__description">
                            <h2>Nom du produit</h2>
                            <p>Vert</p>
                            <p>42,00 €</p>
                        </div>
                        <div class="cart__item__content__settings">
                            <div class="cart__item__content__settings__quantity">
                                <p>Qté : </p>
                                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
                            </div>
                            <div class="cart__item__content__settings__delete">
                                <p class="deleteItem">Supprimer</p>
                            </div>
                        </div>
                    </div>
              </article>
        `;
    }
}