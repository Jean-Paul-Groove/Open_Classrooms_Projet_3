//AFFICHAGE DES TRAVAUX
//Définition d'une classe Work pour créer des objets avecId, titre et catégories pour chaque projet
class Work {
  constructor(workJSON) {
    this.id = workJSON.id;
    this.title = workJSON.title;
    this.imageUrl = workJSON.imageUrl;
    this.categoryId = workJSON.categoryId;
    this.userId = workJSON.userId;
    this.category = workJSON.category;
  }
}
// fonction pour actualiser la liste complète des travaux et l'affichage de l'ensemble des travaux
function fetchListOfWorks(openModal) {
  totalList = [];
  fetch("http://localhost:5678/api/works")
    .then((data) => data.json())
    .then((listJSON) => {
      for (let workJSON of listJSON) {
        let work = new Work(workJSON);
        totalList.push(work);
        categoriesList.set(work.categoryId, work.category.name);
      }
      displayWorks(totalList);
      console.log(categoriesList);
      createFilters(categoriesList);
      if (openModal) {
        openEditModal();
      }
    });
}
//Fonction pour afficher les travaux selon la liste qui lui est passée en argument
function displayWorks(list) {
  gallery.innerHTML = "";
  list.forEach((work) => {
    let figure = stringToHTMLNodes(
      `<figure>
    <img crossorigin="anonymous" src="${work.imageUrl}" alt="${work.title}">
    <figgcaption>${work.title}</figcaption>
  </figure`
    );
    gallery.appendChild(figure);
  });
}

//MISE EN PLACE DES FILTRES
//Fonction pour afficher les boutons filtres correspondant aux catégories
function createFilters(categoriesList) {
  let filtersContainer;
  if (!document.querySelector(".filtersContainer")) {
    filtersContainer = createDiv("filtersContainer");
  } else {
    filtersContainer = document.querySelector(".filtersContainer");
    filtersContainer.innerHTML = "";
  }

  portfolio.insertBefore(filtersContainer, gallery);
  let buttonAll = createButton("Tous", `filter_button button-0`);
  buttonAll.addEventListener("click", () => {
    filterWorks(0);
  });
  filtersContainer.appendChild(buttonAll);
  for (let category of categoriesList) {
    let button = createButton(
      category[1],
      `filter_button button-${category[0]}`
    );
    filtersContainer.appendChild(button);
    button.addEventListener("click", () => {
      filterWorks(category[0]);
    });
  }
}

//Fonction qui crée une liste de projets selon la catégorie choisie et affiche ensuite cette sélection
function filterWorks(categoryId) {
  button = document.querySelector(`.button-${categoryId}`);
  const filterButtons = document.querySelectorAll(".filter_button");
  filterButtons.forEach((filter) => {
    removeActiveButtonStatus(filter);
  });
  button.classList.add("active_button");
  if (categoryId === 0) {
    displayWorks(totalList);
  } else {
    let filteredList = [];
    for (let work of totalList) {
      if (work.categoryId === categoryId) {
        filteredList.push(work);
      }
      displayWorks(filteredList);
    }
  }
}
//Fonction qui supprime la classe active button d'un élément
function removeActiveButtonStatus(button) {
  if (button.classList.contains("active_button")) {
    button.classList.remove("active_button");
  }
}
//On récupère la liste des travaux et on affiche l'ensemble + création des boutons pour les filtres
fetchListOfWorks();