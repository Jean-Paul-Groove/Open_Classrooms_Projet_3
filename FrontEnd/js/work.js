class Work {
    constructor(workJSON){
        this.id = workJSON.id
        this.title = workJSON.title
        this.imageUrl = workJSON.imageUrl
        this.categoryId = workJSON.categoryId
        this.userId = workJSON.userId
        this.category = workJSON.category
    }
}
function filterWorks (categoryId) {
    button = document.querySelector(`.button-${categoryId}`)
    const filterButtons = document.querySelectorAll(".filter_button")
    filterButtons.forEach( filter => {
        filter.classList.remove("active_button")
    })
    button.classList.add("active_button")
    if (categoryId === 0){
        displayWorks(totalList)
    }else{
        let filteredList = [];
        for (let work of totalList){
            if (work.categoryId === categoryId){
                filteredList.push(work)
            }
            displayWorks(filteredList)
        }}    
}
//Fonction pour afficher la liste de travaux
function displayWorks (list){
    gallery.innerHTML=""    
    list.forEach( work => {
        let figure = document.createElement("figure")
        figure.innerHTML = `<img crossorigin="anonymous" src="${work.imageUrl}" alt="${work.title}">`
        let figcaption = document.createElement("figcaption")
        figcaption.innerHTML = work.title   
        figure.appendChild(figcaption)
        gallery.appendChild(figure)}
        )
}
//Fonction pour afficher les filtres en fonctions des catégories
function createFilters(categoriesList){
    let filtersContainer = document.createElement("div")
          filtersContainer.classList.add("filtersContainer")
          portfolio.insertBefore(filtersContainer, gallery)
          let buttonAll = document.createElement("button")
          buttonAll.innerHTML = "Tous"
          buttonAll.classList.add("filter_button", "button-0")
          buttonAll.addEventListener('click', () =>{filterWorks(0)})
          filtersContainer.appendChild(buttonAll)
          for (let category of categoriesList){
            let button = document.createElement("button")
            console.log(category[1].name)
            button.innerHTML = category[1].name
            button.classList.add(`filter_button`, `button-${category[1].id}`)
            filtersContainer.appendChild(button)
            button.addEventListener('click', () =>{filterWorks(category[1].id)})
          }
}
// fonction pour actualiser la liste de travaux
function fetchListOfWorks(){
    totalList=[];
    fetch ("http://localhost:5678/api/works")
    .then( data=>data.json())
    .then(listJSON => {
          for (let workJSON of listJSON) {
              let work = new Work (workJSON)
              totalList.push(work)
              categoriesList.set(work.categoryId, work.category)
              }
          displayWorks(totalList)
          console.log(categoriesList)
          createFilters(categoriesList)
          
    })
}
//fonction pour l'affichage édition
function startEditMode (){
    
   loginLink.innerHTML="logout"
   loginLink.addEventListener("click",(event) =>{
            event.preventDefault()
            sessionStorage.clear()
            loginLink.innerHTML="login"
            editBanner.remove()
            document.body.style.paddingTop = "0";   
        },{once: true}
        )
    let editBanner = document.createElement("div")
    editBanner.classList.add("edit-banner")
    editBanner.innerHTML='<p class="editButton"><i class="fa-regular fa-pen-to-square"></i>  Mode édition</p><button class="button-edit">publier les changements</button>'
    document.body.prepend(editBanner)
    document.body.style.paddingTop = "2em";
    let modal= document.querySelector(".editButton")
        modal.addEventListener("click", ()=>{
            openEditModal()
        })
}
//Fonction qui ouvre la modale d'édition
function openEditModal(){
    let modal = document.createElement("div")
    modal.innerHTML=`<span class="modal_close_button" >&times;</span>
        <h3>Galerie photo</h3>
        <div class="modale-galery"></div>`
    modal.classList.add("edit-modal")
    document.body.appendChild(modal)
    let overlay = document.createElement("div")
    overlay.classList.add("overlay")
    document.body.appendChild(overlay)

}
 
//On récupère le conteneur ".gallery", portfolio et le lien login de la nav
const gallery = document.querySelector(".gallery")
const portfolio = document.getElementById("portfolio")
const loginLink = document.querySelector(".login-link")
let totalList = []
//Map des catégories existantes de filtres
const categoriesList = new Map();
//On fait le premier affichage
fetchListOfWorks()
let token = sessionStorage.getItem("token")
console.log(totalList)
//Si connexion réussie alors un token est dans le SessionStorage
if (token) {
    startEditMode()
}




    
   
 
   
   
    
