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
  categoriesList = [];
  let categorySet = new Set();
  fetch("http://localhost:5678/api/works")
    .then((data) => data.json())
    .then((listJSON) => {
      for (let workJSON of listJSON) {
        let work = new Work(workJSON);
        totalList.push(work);
        //Création d'un set de string pour avoir une liste de catégories sans doublons
        categorySet.add(JSON.stringify(work.category));
      }
      //Retransformation de ces valeurs en objets et ajout à la liste des catégories
      categorySet.forEach((category) => {
        categoriesList.push(JSON.parse(category));
      });
      displayWorks(totalList);
      createFilters(categoriesList);
      //Une fois la galerie chargée on vérifie le token pour ouvrir le mode éditeur
      if (token) {
        startEditMode();
      }
      if (openModal) {
        openEditModal();
      }
    })
    .catch(() => {
      displayNotif(errDisplay);
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
  let buttonAll = createButton("Tous", `filter_button button-0 active_button`);
  buttonAll.addEventListener("click", () => {
    filterWorks(0);
  });
  filtersContainer.appendChild(buttonAll);

  categoriesList.forEach((category) => {
    let button = createButton(
      category.name,
      `filter_button button-${category.id}`
    );
    filtersContainer.appendChild(button);
    button.addEventListener("click", () => {
      filterWorks(category.id);
    });
  });
}

//Fonction qui crée une liste de projets selon la catégorie choisie et affiche ensuite cette sélection
function filterWorks(categoryId) {
  button = document.querySelector(`.button-${categoryId}`);
  let filterButtons = document.querySelectorAll(".filter_button");
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
//Fonction qui supprime la classe active_button d'un élément
function removeActiveButtonStatus(button) {
  if (button.classList.contains("active_button")) {
    button.classList.remove("active_button");
  }
}
