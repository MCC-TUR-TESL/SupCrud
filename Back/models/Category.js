export default class Category{
    static db = "http://localhost:3000";
    static _categories =new Map();
    constructor(id, name, description){
        this.id=id;
        this.name=name;
        this.description = description;
    }
    static get categories(){
        return this._categories;
    }
    static createCategory({id, name, description}){
        try{
            if(!id||!name||!description){
                throw new Error(`ERORR! not all values provided`)
            }
            return new Category(id, name, description)
        } catch(er){
            console.error("error", er)
            return null
        }
    }
    static async fetchCategories(){ //Method to get Categories
        try{
            const response = await fetch(this.db+"/categories/", {
                method:"GET", 
                headers:{"Content-Type":"application/json"}
            })
            if(!response.ok){
                throw new Error(`HTTP ERROR! ${response.status}`)
            }
            const data = await response.json();
            for(const category of data){
                this._categories.set(category?.id, this.createCategory(category))
            }
            return true
        } catch(er){
            console.error("error", er)
            return false;
        }
    }
    static async createNewCategory({id, name, description}){
        if(!id || !name || !description){
            console.error("Not all necessary values provided");
            return false
        }
        const category ={
            id:id,
            name:name,
            description: description
        }
        try{
            if(!(await this.verifyId(id))){
                throw new Error(`HTTP ERROR!, unavailable id`);
            }   
            const response = await fetch(this.db+"/categories/", {
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body: JSON.stringify(category)
            })
            if(!response.ok){
                throw new Error(`HTTP ERROR! ${response.status}`)
            }
            const data = await response.json();
            this.categories.set(data.id, this.createCategory(data));
            if(this.categories.has(id)){
                throw new Error(`HTTP ERROR!, unexpected id`)
            }
            return true;
        } catch(er){
            console.error("error", er)
            return false
        }
    }
    static async verifyId(id){
        if(this.categories.size === 0){
            if(!await this.fetchCategories()){
                return
            };
        }
        return !this.categories.has(id);
    }
}