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
//Fonction pour afficher la liste de travaux
function displayWorks (list){    
    list.forEach( work => {
        let figure = document.createElement("figure")
        figure.innerHTML = `<img crossorigin="anonymous" src="${work.imageUrl}" alt="${work.title}">`
        let figcaption = document.createElement("figcaption")
        figcaption.innerHTML = work.title   
        figure.appendChild(figcaption)
        gallery.appendChild(figure)}
        )
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
              }
          displayWorks(totalList)     
    })
}

 
//On récupère le conteneur ".gallery"
const gallery = document.querySelector(".gallery")
let totalList = []
        
//On fait le premier affichage
fetchListOfWorks()

    
   
 
   
   
    
