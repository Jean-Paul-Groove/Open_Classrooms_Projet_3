//Fonction qui ouvre la page modale d'ajout de projet
function addPictureModal() {
  modal = document.querySelector(".edit-modal");
  modal.innerHTML = "";
  addModalNav(true);
  //Changement du titre de la modale
  createModaleH3("Ajout photo");
  //ajout div drag/drop et ses éléments (logo image, bouton ajouter image, paragrpahe indiquant le format demandé)
  addFileDiv = createDiv("add-file-div");
  dragFileDiv = createDiv("drag-file-div");
  dragFileDiv.innerHTML = `<i class="fa-regular fa-image"></i>`;
  let addFileButton = createButton(
    " + Ajouter photo",
    "add-picture-button button"
  );
  inputButton = document.createElement("input");
  inputButton.type = "file";
  inputButton.name = "image";
  inputButton.setAttribute("id", "input-image-hidden-button");
  addFileButton.addEventListener("click", () => {
    inputButton.click();
  });
  inputButton.addEventListener("change", () => {
    inputImage(inputButton.files[0]);
  });
  let fileFormatIndication = document.createElement("p");
  fileFormatIndication.innerHTML = "jpg, png : 4mo max";
  dragFileDiv.append(addFileButton, inputButton, fileFormatIndication)
  addFileDiv.appendChild(dragFileDiv);
  modal.appendChild(addFileDiv);
  //ajout du formulaire d'upload de projet
  let newProjectForm = stringToHTMLNodes(
    `<form class="new-project-form">
    <label for="work-title">Titre</label>
    <input type="text" name="title" id="work-title">
    <label for="work-categories-selection">Catégorie</label>
    <select name="category" id="work-categories-selection">
    <option></option>
    </select>
    </form>`
  );
  let submitNewWorkButton = createButton("Valider", "submit-new-work button");
  addFileDiv.appendChild(newProjectForm);
  addFileDiv.appendChild(submitNewWorkButton);
  let categorySelection = document.getElementById("work-categories-selection");
  console.log(categorySelection);
  categoriesList.forEach((category) => {
    let categoryOption = document.createElement("option");
    categoryOption.text = category;
    categorySelection.add(categoryOption);
  });
  //Ajout d'un event listener pour indiquer si l'on peut valider ou non
  let inputTitle = document.querySelector("#work-title");
  let inputCategory = document.querySelector("#work-categories-selection");
  inputTitle.addEventListener("change", () => {
    checkAddProjectForm();
  });
  inputTitle.addEventListener("keydown", (e) => {
    if (e.code == "Enter") {
      e.preventDefault();
      if (submitNewWorkButton.classList.contains("active_button")) {
        submitNewWorkButton.click();
      }
    }
  });
  inputCategory.addEventListener("change", () => {
    checkAddProjectForm();
  });
  inputButton.addEventListener("change", () => {
    checkAddProjectForm();
  });
}
//Fonction pour ajouter une image de projet
function inputImage(file) {
  if (file.type.match("image/jpeg") || file.type.match("image/png")) {
    console.log(file + " is a jpg or a png");
    console.log(file);
    if (file.size <= 4000000) {
      console.log(
        "cette image a une dimension de " +
          file.size +
          " ce qui est moins de 4mo"
      );
      previewImg = file;

      let imgUrl = URL.createObjectURL(file);
      dragFileDiv.innerHTML = `<img class="image-preview" src="${imgUrl}" alt="${file.name}">`;
      dragFileDiv.appendChild(inputButton)
      dragFileDiv.addEventListener("click", ()=>{
        inputButton.click()
      }, {once:true})
    } else {
      displayNotif(
        "Votre image est trop volumineuse, veuillez en choisir une autre de 4mo ou moins"
      );
    }
  } else {
    displayNotif(
      "Ce format n'est pas supporté, veuillez sélectionner une image au format .jpg ou .png"
    );
  }
  console.log(previewImg);
}
//Fonction pour vérifier les champs du formulaire d'ajout de projet
function checkAddProjectForm() {
  let title = document.querySelector("#work-title").value;
  let category = document.querySelector("#work-categories-selection").value;
  let submitButton = document.querySelector(".submit-new-work");
  if (typeof title === "string" && title.length > 0) {
    console.log(title);
    if (category.length > 0) {
      console.log(category);
      if (previewImg != 0) {
        console.log(previewImg);
        submitButton.classList.add("active_button");
        //Ajout d'un listener pour le submit d'un nouveau projet
        submitButton.addEventListener(
          "click",
          (e) => {
            e.preventDefault();
            addNewProject();
          },
          { once: true }
        );
      } else {
        submitButton.removeEventListener("click", (e) => {
          e.preventDefault();
          addNewProject();
        });
        removeActiveButtonStatus(submitButton);
      }
    } else {
      submitButton.removeEventListener("click", (e) => {
        e.preventDefault();
        addNewProject();
      });
      removeActiveButtonStatus(submitButton);
    }
  } else {
    submitButton.removeEventListener("click", (e) => {
      e.preventDefault();
      addNewProject();
    });
    removeActiveButtonStatus(submitButton);
  }
}
//Fonction qui ajoute un projet à la galerie
function addNewProject() {
  let formData = new FormData();
  let categoryName = document.querySelector("#work-categories-selection").value;
  const categoryId = getByValue(categoriesList, categoryName);
  let title = document.querySelector("#work-title").value;
  formData.append("image", previewImg);
  formData.append("title", title);
  formData.append("category", categoryId);
  console.log(formData);
  console.log(token);
  fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: { Authorization: "Bearer " + token },
    body: formData,
  }).then((res) => {
    if (res.status == 201) {
      let openModal = true;
      fetchListOfWorks(openModal);
      displayNotif(`« ${title} » a bien été ajouté à la galerie`);
    } else {
      displayNotif("Une erreur est survenue " + res.status);
      if (res.status == 400) {
        displayNotif("Bad request ");
      } else {
        if (res.status == 401) {
          displayNotif("Unauthorized");
        } else {
          displayNotif("Erreur inconnue " + res.status);
        }
      }
    }
  });
}
//Fonction pour retourner l'ID d'une catégorie selon son nom à partir de la map categoriesList
function getByValue(map, searchValue) {
  for (let [key, value] of map.entries()) {
    if (value === searchValue) return key;
  }
}
