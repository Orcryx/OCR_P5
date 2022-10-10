
/** Récupérer les données de l'API */
fetch(`http://localhost:3000/api/products`)
  .then((product) => product.json())
  .then((product) => console.log(JSON.stringify(product)))
  .catch(error => alert('Oops ! il y a une erreur' + error));
 