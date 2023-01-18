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


 
//On récupère le conteneur ".gallery"
const gallery = document.querySelector(".gallery")
const portfolio = document.getElementById("portfolio")
let totalList = []
//Map des catégories existantes de filtres
const categoriesList = new Map();
//On fait le premier affichage
fetchListOfWorks()
console.log(totalList)

//filtres : 


    
   
 
   
   
    
