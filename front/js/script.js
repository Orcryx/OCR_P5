// /** * Récupérer les données de l'API */
fetch(`http://localhost:3000/api/products`)
  //.then(reponse => console.log(reponse))
  .then(product => product.json())
  //.then(product => console.log(JSON.stringify(product))) // Affiche  et transforme les données chaine par 'stringify'
  //.then(product => console.table(product)) // Affiche et transforme les données en tableau
  .then(product => displayProduct(product)) // place les données de la promesse en paramètre de la fonction d'affichage displayProduct
  .catch(error => alert('Oops ! il y a une erreur' + error)); //Affiche un message  - si erreur détectée dans le code 

  /** Créer.Afficher les éléments de l'API */
  function displayProduct(product){
    //Je supprime les éventuels contenu html
  document.querySelector(".items").innerHTML ="";
    // boucle pour créer les produit de 0 à nombre d'occurence dans la liste des données API (product)
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
}


