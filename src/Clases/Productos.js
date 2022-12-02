const fs = require('fs');


class Contenedor{
    constructor(ruta) {
        this.ruta = ruta;
}

async  save(obtProducto) {
    try { 
    const contenidoActual = await fs.promises.readFile(this.ruta ,"utf-8")
      if (contenidoActual.length == 0) {
        const primerContenido ={
            id: 1,
            titulo : obtProducto.titulo,
            price: obtProducto.price,
            thumbnail: obtProducto.thumbnail
        }
     obtProducto=  await fs.promises.writeFile(this.ruta,JSON.stringify([primerContenido],null,2));
        return  primerContenido.id;

      } else {
        const contenidoJSON = JSON.parse(contenidoActual);
        const ultimoID =  contenidoJSON[contenidoJSON.length - 1].id+1;
        obtProducto.id = ultimoID;
        contenidoJSON.push(obtProducto);
        await fs.promises.writeFile(this.ruta,JSON.stringify(contenidoJSON,null,2));
        return ultimoID;

        
      }
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
        try {
        const  contenido = await fs.promises.readFile(this.ruta,"utf-8");
        const contenidoJSON = JSON.parse(contenido);
         return contenidoJSON;
      
        }catch (e) {
            console.log("error : " + e.message);  
        }


    }
}
module.exports = {Contenedor};