const submitButton = document.querySelector("#submit")
let token
submitButton.addEventListener("click", (e)=>{
    e.preventDefault();
let formData = {"email":document.querySelector("#email").value, 
                "password":document.querySelector("#password").value}
let request = JSON.stringify(formData)
fetch ("http://localhost:5678/api/users/login", {
    method:"POST",
    headers :{"Content-Type":"application/json"},
    body: request})
    .then(res=> {
        if (!res.ok){
           return Promise.reject(res)
        }
        return res.json()} )
    .then(res =>{
        displayNotif("Connexion réussie")
        token=res
        console.log(token)
    })
    .catch((err)=>{
        if (err.status == 404 || err.status == 401){
            displayNotif(
                `Identifiant ou mot de passe incorrect !<br> Veuillez réessayer`
            )
        }else{
            displayNotif("Erreur inconnue "+err.status)
        }        
        console.error(err)
    })
    .then(()=>{
        sessionStorage.setItem("userId", JSON.stringify(token.userId))
        sessionStorage.setItem("token", token.token) 
        console.log("Le token est "+sessionStorage.getItem("token"))
        location.href = "index.html" 
    })
    
    
    

})