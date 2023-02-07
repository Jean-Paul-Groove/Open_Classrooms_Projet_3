//Déclaration de variables
const gallery = document.querySelector(".gallery");
const portfolio = document.getElementById("portfolio");
const loginLink = document.querySelector(".login-link");
let totalList = [];
let previewImg = 0;
//Map des catégories existantes de filtres
let categoriesList;

//Déclaration des variables en lien avec la modale
let editGallery;
let addPictureButton;
let deleteAllGalery;
let queuedImage;
let modal;
let addFileDiv;
let dragFileDiv;
let inputButton;
let notifText;
//On vérifie si il y 'a eu une connexion récente à l'aide du token en sessionStorage et si oui on affiche le bandeau pour le mode édition
let token = sessionStorage.getItem("token");

//On récupère la liste des travaux et on affiche l'ensemble + création des boutons pour les filtres + edit mode si token présent
fetchListOfWorks();
