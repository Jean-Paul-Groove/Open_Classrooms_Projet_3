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

const gallery = document.querySelector(".gallery")
let listOfWorks = []
/* On récupère les travaux et on les met au format JSON pour les exploiter */ 
 
  async function fetchWorkList(){
    let data = await fetch ("http://localhost:5678/api/works");
    let worklist = await data.json()
    console.log(worklist)
    return worklist
    }  


console.log(workListJSON)
function createTotalListOfWorks() {
    let finalList
    fetchWorkList
    .then(listJSON => {
        for (let workJSON of listJSON) {
        let work = new Work (workJSON)
        finalList.push(work)
}
return finalList})}
listOfWorks = createTotalListOfWorks ()
console.log(listOfWorks)
console.log(listOfWorks.length)

/* Fonction pour afficher les travaux en fonction de la liste passée en argument */
function displayWorks (list){
    
    list.forEach( project => {
        console.log(project.imageUrl)
        let figure = document.createElement("figure")
        figure.innerHTML = `<img src="${project.imageUrl}" alt="${project.title}">`
        let figcaption = document.createElement("figcaption")
        figcaption.innerHTML = project.title   
        figure.appendChild(figcaption)
        gallery.appendChild(figure)}
        )
}
// On l'appelle une première fois pour l'affichage initial
displayWorks(listOfWorks)

        

 
    /*
    const figure = document.createElement("figure")
    const figcaption = document.createElement("figcaption")
    const img = document.createElement("img")
    console.log(figure)
    img.src = element.imageUrl
    img.alt = element.title
    figcaption.appendChild(work.title)
    figure.appendChild(img)
    figure.appendChild(figcaption)
    gallery.appendChild(figure)
  */
   
    
