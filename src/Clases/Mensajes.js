const fs = require('fs');

class Mensaje{
    constructor(ruta) {
        this.ruta = ruta;
}

async  save(obtMensaje) {
    try { 
        const contenidoActual = await fs.promises.readFile(this.ruta ,"utf-8")
          if (contenidoActual.length == 0) {
            const primerContenido ={
                id: 1,
                author: obtMensaje.user,
                text : obtMensaje.text,
                fecha: obtMensaje.fecha
            }
          await fs.promises.writeFile(this.ruta,JSON.stringify([primerContenido],null,2));
            return  primerContenido.id;
    
          } else {
            const contenidoJSON = JSON.parse(contenidoActual);
            const ultimoID =  contenidoJSON[contenidoJSON.length - 1].id+1;
            obtMensaje.id = ultimoID;
            contenidoJSON.push(obtMensaje);
            await fs.promises.writeFile(this.ruta,JSON.stringify(contenidoJSON,null,2));
            return ultimoID;
    
            
          }
            }catch (e) {
            console.log("error " + e.message);
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
module.exports = {Mensaje};