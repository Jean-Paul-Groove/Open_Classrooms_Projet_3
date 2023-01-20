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
        alert("Connexion réussie")
        token=res
        console.log(token)
    })
    .catch((err)=>{
        if (err.status == 404){
            alert("Cette adresse e-mail n'est pas valide, veuillez vérifier votre addresse")
        }else{
            if (err.status == 401){
            alert("Mot de passe erroné, veuillez réessayer")
        }else{
            alert("Erreur inconnue "+err.status)
        }
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