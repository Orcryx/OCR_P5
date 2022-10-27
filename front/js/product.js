const url =  window.location.href; // propriété qui permet de récupérer l'url d'un page courante 
const newURL = new URL(url); // Créer un nouvel objet à partir de url
const idProduct = newURL.searchParams.get("id"); // Isolé l'ID qui est dans newURL avec .searcParams qui permet de récupérer le paramètre "_id" dans l'url avec .get


/** * Récupérer les informations d'un produit de API avec son ID */
fetch("http://localhost:3000/api/products/"+ idProduct)
    .then(product => product.json())
    .then(product => myProduct(product))
    .catch(error => alert('Opps ! il y a une erreur sur la page produit  ' +error))


/** *Afficher les données du produit :
 *  tableau.entête pour récupérer le produit en fonction de l'ID dans le fetch de API
 * boucle pour récupérer chaque couleur présente dans le tableau des couleurs
 *  */
function myProduct(product)
{
    document.querySelector(".item__img").innerHTML +=`<img src="${product.imageUrl}" alt="${product.altTxt}"></img>`; 
    document.querySelector("#title").innerHTML  +=`<h1 id="title">${product.name}</h1>`;
    document.querySelector("#price").innerHTML +=`<span id="price">${product.price}</span>`;
    document.querySelector("#description").innerHTML +=`<p id="description">${product.description}</p>`;
    for(let i=0; i < product.colors.length; i++ )
    {
        document.querySelector("#colors").innerHTML +=`<option value="${product.colors[i]}">${product.colors[i]}</option>`;
    }  

    /** *Ajouter les données au localStorage lorsque évenement de click sur id=addToCart 
     * et modifie le comportement par défaut avant le submit pour permettre les verifications (voir plus bas)
     * */
    document.querySelector("#addToCart").addEventListener('click', (e) =>
    { 
        e.preventDefault();
        let color = document.querySelector("#colors").value;
        let quantity = parseInt(document.querySelector("#quantity").value);
        if( quantity ===  0 || color ===""){
            e.preventDefault();
            alert('Veillez chsoisir une quantité et une couleur, svp.')     
            
        }else 
        {  
            let customerProduct =
            {
                idChooseProduct : idProduct,
                nameChooseProduct : `${product.name}`,
                prixChooseProduct : `${product.price}`,
                colorChooseProduct : color,
                quantityChooseProduct : quantity,
                imageChooseProduct : `${product.imageUrl}`,   
                altChooseProduct :`${product.altTxt}`,    
            }
            alert('Produit(s) ajouté(s) au panier');
            saveDataInLocalStorage(customerProduct);
        }
    })
}


/** Gérer l'ajout des données dans le localStorage en fonction des sélections de l'utilisateur :
 * Si il n'y a pas de produit en locaStorage alors : créer un produit en localstorage et pousser les données de "customerProduct" dedans
 * Stocker dans le localstorage avec la méthode setIntem l'objet customerProduct transformé en chaine de caractère JSON
 * Si la méthode find() retourne la valeur undefined, il n'y a pas de produit identique dans le panier, donc ajouter un nouvel élément dans le tableau productLocalStorage puis le passer en string
 * Si couleur et ID identique alors la quantité du tableau est modifiée
 */
function saveDataInLocalStorage(customerProduct)
{
let productLocalStorage = JSON.parse(localStorage.getItem("sofa"));
if ( productLocalStorage === null)
    {
        productLocalStorage = [];
        productLocalStorage.push(customerProduct); // créer un entrée dans localStorage : pousser costumerProduct dans productLocalStorage
        localStorage.setItem("sofa", JSON.stringify(productLocalStorage));
    } else 
        {
            const identicalProduct = productLocalStorage.find(element => element.idChooseProduct === customerProduct.idChooseProduct && element.colorChooseProduct === customerProduct.colorChooseProduct);
            if (identicalProduct === undefined) 
                {
                    productLocalStorage.push(customerProduct);
                    localStorage.setItem("sofa", JSON.stringify(productLocalStorage));
                } else
                    {
                        identicalProduct.quantityChooseProduct += customerProduct.quantityChooseProduct; 
                        localStorage.setItem("sofa", JSON.stringify(productLocalStorage));
                    }
        }

}