import Admin from "../../../Back/models/Admin.js";
document.addEventListener("DOMContentLoaded", ()=>{
    const admin = JSON.parse(sessionStorage.getItem("user"))
    if(admin === null)location = "../"; //return to index if not user in sesionStorage
    if(admin.role !=="admin")location = "../"; //return to index if user is not admin
});
(()=>{
    const options = document.querySelector(".iconos-opciones");
    document.querySelector(".admin-name").textContent = JSON.parse(sessionStorage.getItem("user")).name;
    const LogoutBtn = document.createElement("a");
    LogoutBtn.textContent = "Logout"; LogoutBtn.href = "../"; LogoutBtn.classList.add("geneva");
    LogoutBtn.addEventListener("click", ()=>{
        sessionStorage.removeItem("user");
    });
    options.appendChild(LogoutBtn);
})()
const admin = Admin.createAdmin(JSON.parse(sessionStorage.getItem("user")))
await Admin.fetchUsers();
console.log(Admin.users)
document.addEventListener("click", async e=>{
    let attribute = e.target.getAttribute("data-user-id")
    if(attribute){
        console.log(await admin.deleteUser(attribute))
    }
})
