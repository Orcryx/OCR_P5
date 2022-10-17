const url =  window.location.href; // propriété qui permet de récupérer l'url d'un page courante 
console.log(' url du site est : ' + url);
const newURL = new URL(url); // Créer un nouvel objet à partir de url
console.log(' newURL du site est : ' + newURL);
const idProduct = newURL.searchParams.get("_id"); // Isolé l'ID qui est dans newURL avec .searcParams qui permet de récupérer le paramètre "_id" dans l'url avec .get
console.log(' ID du produit est : ' +  idProduct);

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
}

/** *Retourner la valeur dans l'input id=quantity */
function quantityProduct()
{
    return parseInt(document.getElementById("quantity").value);  
}
/** Sur evenement retourner valeur fonction quantityProduct() */

const quantity = document.getElementById("quantity");
quantity.addEventListener("change", ()=>
    {
        console.log('Dans changement ' + quantityProduct());
    }
)


/** Sur evenement retourner valeur fonction colorProduct() */
const color = document.getElementById("colors");
color.addEventListener("change", ()=>
    {
        console.log(colorsProduct());
    }
)
/** *Retourner la valeur dans option de id=colors */
function colorsProduct()
{
    const colorSeclect = document.getElementById("colors").value;
    return colorSeclect;
}


/** *Ajouter les données au localStorage lorsque évenement de click sur id=addToCart + modifie le comportement par défaut avant le submit pour permettre les verifications (voir plus bas)*/
document.querySelector("#addToCart").addEventListener('click', (e) =>
    { 
    e.preventDefault();
    }
)