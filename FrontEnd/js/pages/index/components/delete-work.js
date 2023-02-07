//Fonction pour ouverture de la pop up en cas de suppression d'un projet
function areYouSurePopUp(work) {
  modal.innerHTML = ``;
  createModaleH3(`Voulez-vous vraiment supprimer ${work.title} ?`);
  let img = stringToHTMLNodes(
    `<img class="expanded-image" crossorigin="anonymous" src="${work.imageUrl}" alt="${work.title}">`
  );
  modal.appendChild(img);
  let confirmDiv = createDiv("confirm-div");
  let yesButton = createButton(
    "Oui",
    "confirm-delete-work button confirm-div-button"
  );
  let noButton = createButton(
    "Non",
    "refuse-delete-work button confirm-div-button"
  );
  confirmDiv.append(yesButton, noButton);
  modal.appendChild(confirmDiv);
  addModalNav(true);
  noButton.addEventListener("click", () => {
    openEditModal();
  });
  yesButton.addEventListener("click", () => {
    fetch(`http://localhost:5678/api/works/${work.id}`, {
      method: "DELETE",
      headers: { Authorization: "Bearer " + token },
    })
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(res);
        }
      })
      .then(() => {
        let openModal = true;
        fetchListOfWorks(openModal);
        displayNotif(`« ${work.title} » a bien été supprimé de la galerie`);
      })
      .catch((err) => {
        if (err.status === 401) {
          notifText = errUnauthorized;
        } else {
          notifText = errDefault + err.status;
        }
        displayNotif(notifText);
      });
  });
}
