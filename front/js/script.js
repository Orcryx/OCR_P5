// /** * Récupérer les données de l'API */
fetch(`http://localhost:3000/api/products`)
  .then(product => product.json())
  .then(product => {
    document.querySelector(".items").innerHTML ="";
    for(let i=0; i < product.length; i++)
    {
      document.querySelector(".items").innerHTML += 
        `<a href="./product.html?id=${product[i]._id}">
        <article>
          <img src="${product[i].imageUrl}" alt="${product[i].altTxt}">
          <h3 class="producName">${product[i].name}</h3>
          <p class="productDescription">${product[i].description}</p>
        </article>
      </a>`;
    }
  }) // place les données de la promesse en paramètre de la fonction d'affichage displayProduct
  .catch(error => alert('Oops ! il y a une erreur' + error)); //Affiche un message  - si erreur détectée dans le code 

  /** *Créer.Afficher les éléments de l'API
   * Supprimer les éventuels contenu html
   * boucle pour créer les produits de 0 à nombre(s) d'occurence(s) dans le tableau des données API (product)
   */
//   function displayProduct(product){
//   document.querySelector(".items").innerHTML ="";
//   for(let i=0; i < product.length; i++)
//   {
//     document.querySelector(".items").innerHTML += 
//       `<a href="./product.html?id=${product[i]._id}">
//       <article>
//         <img src="${product[i].imageUrl}" alt="${product[i].altTxt}">
//         <h3 class="producName">${product[i].name}</h3>
//         <p class="productDescription">${product[i].description}</p>
//       </article>
//     </a>`;
//   }
// }


