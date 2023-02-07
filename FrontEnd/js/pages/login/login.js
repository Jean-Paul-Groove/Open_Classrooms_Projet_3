const submitButton = document.querySelector("#submit");
let token;
submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  let formData = {
    email: document.querySelector("#email").value,
    password: document.querySelector("#password").value,
  };
  let request = JSON.stringify(formData);
  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: request,
  })
    .then((res) => {
      if (!res.ok) {
        return Promise.reject(res);
      }
      return res.json();
    })
    .then((res) => {
      token = res;
      sessionStorage.setItem("userId", JSON.stringify(token.userId));
      sessionStorage.setItem("token", token.token);
      location.href = "index.html";
    })
    .catch((err) => {
      if (err.status == 404 || err.status == 401) {
        displayNotif(errLogin);
      } else {
        displayNotif(errDefault + err.status);
      }
    });
});
