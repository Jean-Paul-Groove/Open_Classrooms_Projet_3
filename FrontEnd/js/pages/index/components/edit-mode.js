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
  let editBanner = stringToHTMLNodes(
    `<div class="edit-banner">
      <p class="editButton">
        <i class="fa-regular fa-pen-to-square"></i>  Mode édition
      </p>
      <button class="button-edit">publier les changements</button>
     </div>`
  );
  document.getElementsByTagName("header")[0].appendChild(editBanner);
  document.body.style.paddingTop = "2em";
  let openModal = document.querySelector(".editButton");
  openModal.addEventListener("click", () => {
    openEditModal();
  });
  let editProfilePicture = createEditElementParagraph(
    "profile-picture",
    document.querySelector("#introduction figure")
  );
  let editIntroductionDescription = createEditElementParagraph(
    "introduction-description",
    document.querySelector("#introduction article")
  );
  let editPortfolioTitle = createEditElementParagraph(
    "portfolio-title",
    document.querySelector("#portfolio")
  );
}

function createEditElementParagraph(name, parent) {
  let editParagraph = document.createElement("p");
  editParagraph.setAttribute("class", `edit-element-paragraph edit-${name}`);
  editParagraph.innerHTML =
    '<i class="fa-regular fa-pen-to-square"></i> Modifier';
  parent.appendChild(editParagraph);
  parent.style.position = "relative";
  return editParagraph;
}
