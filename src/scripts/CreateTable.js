const {options} = require("../confDB/configDB");
const knex = require("Knex");
 const {options2} = require("../confDB/configDB");
const databaseMariaDB = knex(options.mysql);
 const databaseSqlite = knex(options.sqlite);


const createTable = async ()=> {
    
    let tablaprod = await databaseMariaDB.schema.hasTable("productos");
    if(tablaprod){
        await databaseMariaDB.schema.dropTable("productos");
    }
    
    
     await   databaseMariaDB.schema.createTable("productos", table=>{
            table.increments("ID");
            table.string("title", 50).nullable(false);
            table.integer("price").nullable(false);
            table.string("thumbnail", 255).nullable(false); 
        });
        console.log("tabla Productos creadado");


         let tablaChat = await databaseSqlite.schema.hasTable("Chat");
         if (tablaChat){
             await databaseSqlite.schema.dropTable("Chat")
         }
            await databaseSqlite.schema.createTable("Chat", table=>{
                table.increments("ID");
                table.string("author", 50).nullable(false);
                table.string("text", 255).nullable(false);
                table.string("fecha", 255).nullable(false);
                });
                
                console.log("tabla Chat creadado");
    
    databaseMariaDB.destroy();
    databaseSqlite.destroy();
};
createTable();