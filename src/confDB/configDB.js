const path = require('path');

const options = {
    mysql:{
    client: "mysql",
    connection: {
    host : "127.0.0.1",
    user : "root",
    password : "",
    database: "mybase",
    port: 3306
    },

    
},
sqlite:{
    client: "sqlite",
    connection:{
        filename:path.join(__dirname  , "./DB/dbchat.sqlite")
    },
    useNullAsDefault:true
}
}
module.exports = {options}

