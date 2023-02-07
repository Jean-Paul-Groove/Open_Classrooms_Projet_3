//Fonction qui ouvre la modale d'édition lorsque le bouton Mode édition est cliqué
function openEditModal() {
  //Création de la div pour la modale
  if (document.querySelector(".edit-modal")) {
    document.querySelector(".edit-modal").remove();
  }
  modal = createDiv("edit-modal");
  createModaleH3("Galerie photo");
  editGallery = createDiv("modal-gallery");
  addPictureButton = createButton(
    "Ajouter une photo",
    "modal-add-picture_button button"
  );
  deleteAllGalery = stringToHTMLNodes(
    `<span class="modal-delete-galery">Supprimer la galerie</span>`
  );
  modal.append(editGallery, addPictureButton, deleteAllGalery);
  document.body.appendChild(modal);
  //création div pour l'overlay
  if (!document.querySelector(".overlay")) {
    let overlay = document.createElement("div");
    overlay.classList.add("overlay");
    overlay.addEventListener("click", () => {
      closeModal();
    });
    document.body.appendChild(overlay);
  }
  addModalNav();
  //Ajout event pour interface d'ajout de projet
  addPictureButton.addEventListener(
    "click",
    () => {
      addPictureModal();
    },
    { once: true }
  );
  displayWorksEditMode(totalList);
}
//Fonction pour afficher la galerie dans la modale
function displayWorksEditMode(list) {
  list.forEach((work) => {
    let figure = stringToHTMLNodes(
      `<figure>
        <img crossorigin="anonymous" src="${work.imageUrl}" alt="${work.title}">
        <p id="work-${work.id}">
          éditer
        </p>
        <p id="delete-work-${work.id}" class="delete-work-button">
          <i class="fa-solid fa-trash-can"></i>
        </p>
      </figure>`
    );
    editGallery.appendChild(figure);
    const deleteWork = document.querySelector(`#delete-work-${work.id}`);
    deleteWork.addEventListener("click", () => {
      areYouSurePopUp(work);
    });
  });
}
// Fonction qui ferme la modale
function closeModal() {
  let overlay = document.querySelector(".overlay");
  if (modal) {
    modal.remove();
  }
  if (overlay) {
    overlay.remove();
  }
}
//Ajout boutons de navigation de la modale
function addModalNav(isGoBackButton) {
  let modalNav = stringToHTMLNodes(
    `<p class="modal-nav">
      <span class="modal_close_button">&times</span>
      </p>`
  );
  modal.insertBefore(modalNav, modal.firstChild);
  let closeModalButton = document.querySelector(".modal_close_button");
  if (isGoBackButton) {
    let goBack = document.createElement("span");
    goBack.classList.add("go-back_button");
    goBack.innerHTML = "&#8592";
    goBack.addEventListener("click", () => {
      openEditModal();
    });
    modalNav.insertBefore(goBack, closeModalButton);
  }
  closeModalButton.addEventListener("click", () => {
    closeModal();
  });
}

function createModaleH3(innerText) {
  let modalTitle = document.createElement("h3");
  modalTitle.innerHTML = innerText;
  modal.appendChild(modalTitle);
}
