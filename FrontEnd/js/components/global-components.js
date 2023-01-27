//Fonction pour l'affichage de notification
function displayNotif(message) {
  let notif = stringToHTMLNodes(`
    <div class="notification-pop-up">
    <span class="notif_close_button">&times;</span>
    <p>${message}</p>
    </div>`);
  document.body.appendChild(notif);
  notif.querySelector(".notif_close_button").addEventListener(
    "click",
    () => {
      notif.remove();
    },
    { once: true }
  );
}
//Fonction pour convertir une string en contenu html
const parser = new DOMParser();
function stringToHTMLNodes(string) {
  let doc = parser.parseFromString(string, "text/html");
  return doc.body.firstChild;
}
//Fonction pour créer une div avec une class et un id
function createDiv(className, id) {
  let div = document.createElement("div");
  if (className) {
    div.setAttribute("class", className);
  }
  if (id) {
    div.setAttribute("id", id);
  }
  return div;
}
//Fonction qui crée un bouton avec class et ID
function createButton(innerText, className, id) {
  let button = document.createElement("button");
  button.innerText = innerText;
  if (className) {
    button.setAttribute("class", className);
  }
  if (id) {
    button.setAttribute("id", id);
  }
  return button;
}
