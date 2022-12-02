const knex  = require("knex");
const {options} = require("../../confDB/configDB");


class ContenedorProdSQL{
    constructor(options, tabla){
        this.database = knex(options);
        this.table = tabla;
    }

async  save(obtProducto) {
    try {      
        const Contenido ={
            title : obtProducto.titulo,
            price: obtProducto.price,
            thumbnail: obtProducto.thumbnail
        }
        console.log("Sali de la funcaoin")
        await this.database.from(this.table).insert(Contenido)
        return  Contenido.id;
      
        }catch (e) {
        console.log("error " + e.message);
        }

}
async getById(id){
    try {
        if(this.ruta.length > 0){
          const productos =  await this.getAll();
        const prducto = productos.find(elemento => elemento.id === id);
        return prducto;
          
        }else{
            return null;
        }

    }catch (e) {
        console.log("error : " + e.message);
                }   
    }
    async getdeleteById(id){try {
        const productos = await this.getAll();
        const newproductos = productos.filter(elemento => elemento.id != id);
        await fs.promises.writeFile(this.ruta, JSON.stringify(newproductos,null,2));
    }catch (e) {
        console.log("error : " + e.message);
        }
        
    }
   async deletAll(){
        try{
            await fs.promises.writeFile(this.ruta, "");
        }catch (e) {
            console.log("error : " + e.message);
        }
            
    }

    async getAll(){
        try{
            const responense = await this.database.from(this.table).select("*");
            console.log(responense);
            return responense; 
          
    
        }catch(e) {
            return e.message;
        }
        
    }
}
module.exports = {ContenedorProdSQL};