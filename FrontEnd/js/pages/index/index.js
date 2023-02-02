//Déclaration de variables
const gallery = document.querySelector(".gallery")
const portfolio = document.getElementById("portfolio")
const loginLink = document.querySelector(".login-link")
let totalList = []
let previewImg = 0
//Map des catégories existantes de filtres
const categoriesList = new Map()

//Déclaration des variables en lien avec la modale
let editGallery
let addPictureButton
let deleteAllGalery
let queuedImage
let modal
let addFileDiv
let dragFileDiv
let inputButton

//On récupère la liste des travaux et on affiche l'ensemble + création des boutons pour les filtres
fetchListOfWorks()
