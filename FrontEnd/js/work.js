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
function fetchListOfWorks() {
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
    });
}
//Fonction pour afficher les travaux selon la liste qui lui est passée en argument
function displayWorks(list) {
  gallery.innerHTML = "";
  list.forEach((work) => {
    let figure = document.createElement("figure");
    figure.innerHTML = `<img crossorigin="anonymous" src="${work.imageUrl}" alt="${work.title}">`;
    let figcaption = document.createElement("figcaption");
    figcaption.innerHTML = work.title;
    figure.appendChild(figcaption);
    gallery.appendChild(figure);
  });
}

//MISE EN PLACE DES FILTRES
//Fonction pour afficher les boutons filtres correspondant aux catégories
function createFilters(categoriesList) {
    let filtersContainer
    if(!document.querySelector(".filtersContainer")){
        filtersContainer = document.createElement("div");
    }else{
        filtersContainer = document.querySelector(".filtersContainer");
        filtersContainer.innerHTML=""
    }
  filtersContainer.classList.add("filtersContainer");
  portfolio.insertBefore(filtersContainer, gallery);
  let buttonAll = document.createElement("button");
  buttonAll.innerHTML = "Tous";
  buttonAll.classList.add("filter_button", "button-0");
  buttonAll.addEventListener("click", () => {
    filterWorks(0);
  });
  filtersContainer.appendChild(buttonAll);
  for (let category of categoriesList) {
    let button = document.createElement("button");
    button.innerHTML = category[1];
    button.classList.add(`filter_button`, `button-${category[0]}`);
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

//MODE ÉDITION LORSQU'UN TOKEN EST PRÉSENT
//fonction pour l'affichage édition
function startEditMode() {
  loginLink.innerHTML = "logout";
  loginLink.addEventListener(
    "click",
    (event) => {
      event.preventDefault();
      sessionStorage.clear();
      loginLink.innerHTML = "login";
      editBanner.remove();
      document.body.style.paddingTop = "0";
    },
    { once: true }
  );
  let editBanner = document.createElement("div");
  editBanner.classList.add("edit-banner");
  editBanner.innerHTML =
    '<p class="editButton"><i class="fa-regular fa-pen-to-square"></i>  Mode édition</p><button class="button-edit">publier les changements</button>';
  document.body.prepend(editBanner);
  document.body.style.paddingTop = "2em";
  let openModal = document.querySelector(".editButton");
  openModal.addEventListener("click", () => {
    openEditModal();
  })
  let editProfilePicture = document.createElement("p")
  editProfilePicture.classList.add("edit-element-paragraph")
  editProfilePicture.innerHTML='<i class="fa-regular fa-pen-to-square"></i> Modifier'
  document.querySelector("#introduction figure").appendChild(editProfilePicture)
  let marginLeftOfProfilePicture = window.getComputedStyle(document.querySelector("#introduction figure img")).getPropertyValue('margin-left')
  console.log(marginLeftOfProfilePicture)
  editProfilePicture.style.marginLeft=marginLeftOfProfilePicture
  editProfilePicture.style.marginTop="5px"
}
//Fonction qui ouvre la modale d'édition lorsque le bouton Mode édition est cliqué
function openEditModal() {
  //Création de la div pour la modale
  let modal
  if (!document.querySelector(".edit-modal")){
    modal = document.createElement("div");
  }else{
    modal = document.querySelector(".edit-modal")
  }
  
  modal.innerHTML = `<p class="modal-nav"><span class="modal_close_button" >&times;</span></p>
        <h3>Galerie photo</h3>
        <div class="modal-gallery"></div>
        <button class="modal-add-picture_button button">Ajouter une photo</button>
        <span class="modal-delete-galery">Supprimer la galerie</span>`;
  modal.classList.add("edit-modal");
  document.body.appendChild(modal);
  //création div pour l'overlay
  if(!document.querySelector(".overlay")){
    let overlay = document.createElement("div");
    overlay.classList.add("overlay");
    document.body.appendChild(overlay);
  }
  //Ajout event pour fermeture de la modale
  let closeModalButton = document.querySelector(".modal_close_button");
  closeModalButton.addEventListener("click", () => {
    closeModal();
  });
  //Ajout event pour interface d'ajout de projet
  let addPictureButton = document.querySelector(".modal-add-picture_button");
  addPictureButton.addEventListener("click", () => {
    addPictureModal();
  });
  displayWorksEditMode(totalList);
}
//Fonction pour afficher la galerie dans la modale
function displayWorksEditMode(list) {
  let editGallery = document.querySelector(".modal-gallery");
  list.forEach((work) => {
    let figure = document.createElement("figure");
    figure.innerHTML = `<img crossorigin="anonymous" src="${work.imageUrl}" alt="${work.title}">`;
    let editP = document.createElement("p");
    editP.innerHTML = "éditer";
    editP.setAttribute("id", "work-" + work.id);
    let deleteWork = document.createElement("p");
    deleteWork.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
    deleteWork.setAttribute("id", "delete-work-" + work.id);
    deleteWork.classList.add("delete-work-button");
    deleteWork.addEventListener("click", () => {
      areYouSurePopUp(work);
    });
    figure.appendChild(editP);
    figure.appendChild(deleteWork);
    editGallery.appendChild(figure);
  });
}
//Fonction qui ouvre la page modale d'ajout de projet
function addPictureModal() {
  //Ajout bouton retour
  let modal = document.querySelector(".edit-modal");
  let goBack = document.createElement("span");
  let modalNav = document.querySelector(".modal-nav");
  goBack.classList.add("go-back_button");
  goBack.innerHTML = "&#8592";
  goBack.addEventListener("click", () => {
    openEditModal();
  });
  modalNav.prepend(goBack);
  //Changement du titre de la modale
  let modalTitle = document.querySelector(".edit-modal h3");
  modalTitle.innerHTML = "Ajout photo";
  //suppression de la galerie et des boutons "ajout photo" et "supprimer galerie"
  modal.removeChild(modal.children[2]);
  modal.removeChild(modal.children[2]);
  modal.removeChild(modal.children[2]);
  //ajout div drag/drop et ses éléments (logo image, bouton ajouter image, paragrpahe indiquant le format demandé)
  let addFileDiv = document.createElement("div");
  addFileDiv.classList.add("add-file-div");
  let dragFileDiv = document.createElement("div");
  dragFileDiv.classList.add("drag-file-div");
  dragFileDiv.innerHTML = `<i class="fa-regular fa-image"></i>`;
  let addFileButton = document.createElement("button");
  let inputButton = document.createElement("input");
  inputButton.type = "file";
  inputButton.name = "image";
  inputButton.setAttribute("id", "input-image-hidden-button");
  addFileButton.innerHTML = " + Ajouter photo";
  addFileButton.classList.add("add-picture-button", "button");
  addFileButton.addEventListener("click", () => {
    document.querySelector("#input-image-hidden-button").click();
  });
  inputButton.addEventListener("change", () => {
    inputImage(inputButton.files[0]);
  });
  let fileFormatIndication = document.createElement("p");
  fileFormatIndication.innerHTML = "jpg, png : 4mo max";
  dragFileDiv.appendChild(addFileButton);
  dragFileDiv.appendChild(inputButton);
  dragFileDiv.appendChild(fileFormatIndication);
  addFileDiv.appendChild(dragFileDiv);
  modal.appendChild(addFileDiv);
  //ajout du formulaire d'upload de projet
  let newProjectForm = document.createElement("form");
  newProjectForm.innerHTML = `
        <label for="work-title">Titre</label>
        <input type="text" name="title" id="work-title">
        <label for="work-categories-selection">Catégorie</label>
        <select name="category" id="work-categories-selection">
        <option></option>
        </select>`;
  newProjectForm.classList.add("new-project-form");
  let submitNewWorkButton = document.createElement("button");
  submitNewWorkButton.innerHTML = "Valider";
  submitNewWorkButton.classList.add("button");
  submitNewWorkButton.classList.add("submit-new-work");
  addFileDiv.appendChild(newProjectForm);
  addFileDiv.appendChild(submitNewWorkButton);
  let categorySelection = document.getElementById("work-categories-selection");
  console.log(categorySelection);
  categoriesList.forEach((category) => {
    let categoryOption = document.createElement("option");
    categoryOption.text = category;
    categorySelection.add(categoryOption);
  });
  //Ajout d'un event listener pour indiquer si l'on peut valider ou non
  let inputTitle = document.querySelector("#work-title");
  let inputCategory = document.querySelector("#work-categories-selection");
  inputTitle.addEventListener("change", () => {
    checkAddProjectForm();
  });
  inputTitle.addEventListener("keydown", (e) => {
    if (e.code == "Enter") {
      e.preventDefault();
      if (submitNewWorkButton.classList.contains("active_button")) {
        submitNewWorkButton.click();
      }
    }
  });
  inputCategory.addEventListener("change", () => {
    checkAddProjectForm();
  });
  inputButton.addEventListener("change", () => {
    checkAddProjectForm();
  });
}
// Fonction qui ferme la modale
function closeModal() {
  let modal = document.querySelector(".edit-modal");
  let overlay = document.querySelector(".overlay");
  if (modal) {
    modal.remove();
  }
  if(overlay){
    overlay.remove();
  }
}
//Fonction pour ouverture de la pop up en cas de suppression d'un projet
function areYouSurePopUp(work) {
  let modal = document.querySelector(".edit-modal");
  modal.innerHTML = `<h3>Voulez-vous vraiment supprimer ${work.title} ?</h3>
    <img class="expanded-image" crossorigin="anonymous" src="${work.imageUrl}" alt="${work.title}">
    <div class="confirm-div">
        <button class="confirm-delete-work button confirm-div-button">Oui</button>
        <button class="refuse-delete-work button confirm-div-button">Non</button>
    </div>`;
  document
    .querySelector(".refuse-delete-work")
    .addEventListener("click", () => {
      openEditModal();
    });
  document
    .querySelector(".confirm-delete-work")
    .addEventListener("click", (e) => {
      fetch(`http://localhost:5678/api/works/${work.id}`, {
        method: "DELETE",
        headers: { Authorization: "Bearer " + token },
      })
        .then((res) => {
        fetchListOfWorks()
            if (!res.status == 200 && !res.status == 204 ) {
                alert("Une erreur est survenue "+res.status)
            }else{
                document.querySelector(".gallery").addEventListener("DOMNodeInserted",()=>{
                  openEditModal() 
                  alert("Element supprimé avec succès"); 
                }, { once: true })
                
            
            }
        
        })
        .then(()=>{
            console.log(totalList)
        })
        .then(()=>{
            
        })
    });
}

//Fonction pour ajouter une image de projet
function inputImage(file) {
  if (file.type.match("image/jpeg") || file.type.match("image/png")) {
    console.log(file + " is a jpg or a png");
    console.log(file);
    if (file.size <= 4000000) {
      console.log(
        "cette image a une dimension de " +
          file.size +
          " ce qui est moins de 4mo"
      );
      previewImg = file;

      let imgUrl = URL.createObjectURL(file);
      document.querySelector(
        ".drag-file-div"
      ).innerHTML = `<img class="image-preview" src="${imgUrl}" alt="${file.name}">
                                        <input type="file" accept="image" id="input-image-hidden-button">`;
    } else {
      alert(
        "Votre image est trop volumineuse, veuillez en choisir une autre de 4mo ou moins"
      );
    }
  } else {
    alert(
      "Ce format n'est pas supporté, veuillez sélectionner une image au format .jpg ou .png"
    );
  }
  console.log(previewImg);
}
//Fonction pour vérifier les champs du formulaire d'ajout de projet
function checkAddProjectForm() {
  let title = document.querySelector("#work-title").value;
  let category = document.querySelector("#work-categories-selection").value;
  let submitButton = document.querySelector(".submit-new-work");
  if (typeof title === "string" && title.length > 0) {
    console.log(title);
    if (category.length > 0) {
      console.log(category);
      if (previewImg != 0) {
        console.log(previewImg);
        submitButton.classList.add("active_button");
        //Ajout d'un listener pour le submit d'un nouveau projet
        submitButton.addEventListener("click", (e) => {
          e.preventDefault();
          addNewProject();
        });
      } else {
        submitButton.removeEventListener("click", (e) => {
          e.preventDefault();
          addNewProject();
        });
        removeActiveButtonStatus(submitButton);
      }
    } else {
      submitButton.removeEventListener("click", (e) => {
        e.preventDefault();
        addNewProject();
      });
      removeActiveButtonStatus(submitButton);
    }
  } else {
    submitButton.removeEventListener("click", (e) => {
      e.preventDefault();
      addNewProject();
    });
    removeActiveButtonStatus(submitButton);
  }
}
//Fonction qui ajoute un projet à la galerie
function addNewProject() {
  let formData = new FormData();
  let categoryName = document.querySelector("#work-categories-selection").value;
  const categoryId = getByValue(categoriesList, categoryName);
  let title = document.querySelector("#work-title").value;
  formData.append("image", previewImg);
  formData.append("title", title);
  formData.append("category", categoryId);
  console.log(formData);
  console.log(token);
  fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: { Authorization: "Bearer " + token },
    body: formData,
  })
  .then((res) => {
    fetchListOfWorks()
    return res
})
    .then((res)=>{
        if (res.status == 201) {
            document.querySelector(".gallery").addEventListener("DOMNodeInserted",()=>{
                openEditModal() 
                alert("Un élément a été ajouté avec succès"); 
              }, { once: true })
    }else{
      alert("Une erreur est survenue "+res.status)
      if (res.status == 400) {
        alert("Bad request ");
      } else {
        if (res.status == 401) {
          alert("Unauthorized");
        } else {
          alert("Erreur inconnue " + res.status);
        }
      }
    }})  
}
//Fonction qui supprime la classe active button d'un élément
function removeActiveButtonStatus(button) {
  if (button.classList.contains("active_button")) {
    button.classList.remove("active_button");
  }
}
//Fonction pour retourner l'ID d'une catégorie selon son nom à partir de la map categoriesList
function getByValue(map, searchValue) {
  for (let [key, value] of map.entries()) {
    if (value === searchValue) return key;
  }
}
//EXECUTION DU CODE

//On récupère le conteneur ".gallery", portfolio et le lien login de la nav
const gallery = document.querySelector(".gallery");
const portfolio = document.getElementById("portfolio");
const loginLink = document.querySelector(".login-link");
let totalList = [];
let previewImg = 0;
//Map des catégories existantes de filtres
const categoriesList = new Map();
let queuedImage;

//On récupère la liste des travaux et on affiche l'ensemble + création des boutons pour les filtres
fetchListOfWorks();

//On vérifie si il y 'a eu une connexion récente à l'aide du token en sessionStorage et si oui on affiche le bandeau pour le mode édition
let token = sessionStorage.getItem("token");
console.log(totalList);
//Si connexion réussie alors un token est dans le SessionStorage
if (token) {
  startEditMode();
}
