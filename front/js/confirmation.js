//const url =  window.location.href; // propriété qui permet de récupérer l'url d'un page courante 
const newURL = new URL(window.location.href); // Créer un nouvel objet à partir de url
const idCommande = newURL.searchParams.get("id"); // Isolé l'ID qui est dans newURL avec .searcParams qui permet de récupérer le paramètre "_id" dans l'url avec .get


document.querySelector('#orderId').innerHTML= idCommande;
document.querySelector('#orderId').style.color = "#6599c2" ; 