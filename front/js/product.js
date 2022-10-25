const url =  window.location.href; // propriété qui permet de récupérer l'url d'un page courante 
//console.log(' url du site est : ' + url);
const newURL = new URL(url); // Créer un nouvel objet à partir de url
//console.log(' newURL du site est : ' + newURL);
const idProduct = newURL.searchParams.get("_id"); // Isolé l'ID qui est dans newURL avec .searcParams qui permet de récupérer le paramètre "_id" dans l'url avec .get
//console.log(' ID du produit est : ' +  idProduct);

/** * Récupérer les informations d'un produit de API avec son ID */
fetch("http://localhost:3000/api/products/"+ idProduct)
    .then(product => product.json())
    //.then(product => console.table(product))
    .then(product => myProduct(product))
    .catch(error => alert('Opps ! il y a une erreur sur la page produit  ' +error))


    /** *Fonction qui affiche l'élément.entête après avoir récupérer le produit en fonction de l'ID dans le fetch de API */
function myProduct(product)
{
    document.querySelector(".item__img").innerHTML +=`<img src="${product.imageUrl}" alt="${product.altTxt}"></img>`; 
    document.querySelector("#title").innerHTML  +=`<h1 id="title">${product.name}</h1>`;
    document.querySelector("#price").innerHTML +=`<span id="price">${product.price}</span>`;
    document.querySelector("#description").innerHTML +=`<p id="description">${product.description}</p>`;
    //boucle pour récupérer chaque couleur présente dans le tableau des couleurs
    for(let i=0; i < product.colors.length; i++ )
    {
        document.querySelector("#colors").innerHTML +=`<option value="${product.colors[i]}">${product.colors[i]}</option>`;
    }  

    /** *Ajouter les données au localStorage lorsque évenement de click sur id=addToCart + modifie le comportement par défaut avant le submit pour permettre les verifications (voir plus bas)*/
    document.querySelector("#addToCart").addEventListener('click', (e) =>
    { 
        e.preventDefault();
        let color = document.querySelector("#colors").value;
        //console.log('La couleur du produit est : ' + color);
        let quantity = parseInt(document.querySelector("#quantity").value);
        //console.log('Le nombre de produit à commander est : ' + quantity);
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
        //console.log(customerProduct);
        saveDataInLocalStorage(customerProduct);
        //alert('Produit(s) ajouté(s) au panier');
    })
}



function saveDataInLocalStorage(customerProduct)
{

let productLocalStorage = JSON.parse(localStorage.getItem("sofa"));
// Si il n'y a pas de produit en locaStorage alors : créer un produit en localstorage et pousser les données de "customerProduct" dedans
if ( productLocalStorage === null)
    {
        productLocalStorage = [];
        productLocalStorage.push(customerProduct); // créer un entrée dans localStorage
        // Stocker dans le localstorage avec la méthode setIntem l'objet customerProduct transformé en chaine de caractère JSON
        localStorage.setItem("sofa", JSON.stringify(productLocalStorage));
    } else 
        {
            const identicalProduct = productLocalStorage.find(element => element.idChooseProduct === customerProduct.idChooseProduct && element.colorChooseProduct === customerProduct.colorChooseProduct);
            if (identicalProduct === undefined) // Si la méthode find() retourne la valeur undefined, il n'y a pas de produit identique dans le panier, donc ajouter un nouvel élément dans le tableau productLocalStorage puis le passer en string
                {
                    productLocalStorage.push(customerProduct);
                    localStorage.setItem("sofa", JSON.stringify(productLocalStorage));
                } else
                    {
                        identicalProduct.quantityChooseProduct += customerProduct.quantityChooseProduct; // couleur et ID identique alors la quantité du tableau est modifiée
                        localStorage.setItem("sofa", JSON.stringify(productLocalStorage));
                    }
        }

}