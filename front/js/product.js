var url =  window.location.href; // propriété qui permet de récupérer l'url d'un page courante 
console.log(' url du site est : ' + url);
var newURL = new URL(url); // Créer un nouvel objet à partir de url
console.log(' newURL du site est : ' + newURL);
const idProduct = newURL.searchParams.get("_id"); // Isolé l'ID qui est dans newURL avec .searcParams qui permet de récupérer le paramètre "_id" dans l'url avec .get
console.log(' ID du produit est : ' +  idProduct);