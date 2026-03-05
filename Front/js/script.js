const verifyLogin = ()=>{
    const user = JSON.parse(sessionStorage.getItem("user"));
    if(user===null){
        return false
    }
    return true
}
let isLogged = verifyLogin();
const nav = document.getElementById("nav-menu-box");
//Boton para cerrar sesioń
const logOut = document.createElement("a"); logOut.textContent ="Log out"; 
logOut.setAttribute("href", "#");
logOut.classList.add("nav-menu-txt-box", "nav-menu-txt")
logOut.addEventListener("click", ()=>{
    sessionStorage.removeItem("user");
    location.reload();
})
//Link para mostrar iniciar sesión o mostrar el carrito
let link = isLogged ? `<a href="#" class="nav-menu-txt">Carrito</a>` : `<a href="./log_in.html" class="nav-menu-txt">Log In</a>`;
const navElement = document.createElement("div"); navElement.classList.add("nav-menu-txt-box"); navElement.innerHTML = link;
nav.appendChild(navElement)
if(isLogged) nav.appendChild(logOut)