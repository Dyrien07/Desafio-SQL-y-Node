const knex  = require("knex");

class ContenedorMensajeSQL{
    constructor(options2, tabla){
        this.database = knex(options2);
        this.table = tabla;
    }



    async  save(obtMensaje) {
        try { 
            console.log("estoy en  linea 13");
                console.log(obtMensaje);
                const Contenido ={
                    author: obtMensaje.author,
                    text: obtMensaje.text,
                    fecha: obtMensaje.fecha
                }
                console.log(Contenido);
                await this.database.from(this.table).insert(Contenido)
                return  Contenido.id;
            }catch(error){
                console.log(error)
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
module.exports = {ContenedorMensajeSQL}