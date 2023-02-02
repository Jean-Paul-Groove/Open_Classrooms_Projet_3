//MODE ÉDITION LORSQU'UN TOKEN EST PRÉSENT
//fonction pour l'affichage édition
function startEditMode() {
  loginLink.innerHTML = "logout"
  loginLink.addEventListener(
    "click",
    (event) => {
      event.preventDefault()
      sessionStorage.clear()
      loginLink.innerHTML = "login"
      editBanner.remove()
      document.body.style.paddingTop = "0"
    },
    { once: true }
  )
  let editBanner = stringToHTMLNodes(
    `<div class="edit-banner">
      <p class="editButton">
        <i class="fa-regular fa-pen-to-square"></i>  Mode édition
      </p>
      <button class="button-edit">publier les changements</button>
     </div>`
  )
  document.getElementsByTagName("header")[0].appendChild(editBanner)
  document.body.style.paddingTop = "2em"
  let openModal = document.querySelector(".editButton")
  openModal.addEventListener("click", () => {
    openEditModal()
  })
  let editProfilePicture = document.createElement("p")
  editProfilePicture.classList.add("edit-element-paragraph")
  editProfilePicture.innerHTML =
    '<i class="fa-regular fa-pen-to-square"></i> Modifier'
  document
    .querySelector("#introduction figure")
    .appendChild(editProfilePicture)
  let marginLeftOfProfilePicture = window
    .getComputedStyle(document.querySelector("#introduction figure img"))
    .getPropertyValue("margin-left")
  editProfilePicture.style.marginLeft = marginLeftOfProfilePicture
  editProfilePicture.style.marginTop = "5px"
}

//On vérifie si il y 'a eu une connexion récente à l'aide du token en sessionStorage et si oui on affiche le bandeau pour le mode édition
let token = sessionStorage.getItem("token")
//Si connexion réussie alors un token est dans le SessionStorage
if (token) {
  startEditMode()
}
