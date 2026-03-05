import User from "../../Back/models/User.js";
import Admin from "../../Back/models/Admin.js";
const rechargueUser = ()=>{
    const userData = JSON.parse(sessionStorage.getItem("user"))
    if(userData === null){
        return null
    }
    switch (userData.role) {
        case "admin":
            return User.createUser(userData)
        default:
            return Admin.createAdmin(userData)
    }
}
