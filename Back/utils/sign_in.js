import User from "../models/User.js";
export const signIn= async (name, password, email)=>{
    try{
        const user = {
            name: name,
            email:email,
            password:password,
            role:"user"
        }
        const response = await fetch(User.db+"/users", {
            method:"POST",
            headers:{"Content-Type":"applicaton/json"},
            body:JSON.stringify(user)
        })
        if(!response.ok){
            return new Error(`HTTP ERROR!, ${response.status}`)
        }
        const data = await response.json();
        return new User(data?.id, data?.name, data?.email, data?.password)
    }catch(er){
        console.error("Error", er)
    }
}
export const verifyEmail = async (email)=>{
    try{
        const response = await User.verifyEmail(email)
        if(response){
            return true
        }
        return false;
    } catch(er){
        console.error("Error", er)
    }
}
export default signIn