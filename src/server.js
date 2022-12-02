const express = require('express');
const {options} = require('./confDB/configDB');
const handlebars = require("express-handlebars");
const path = require('path');
const {Server} = require("socket.io");
const moment = require('moment');
const {ContenedorProdSQL} = require('../src/Clases/ClasesDB/ProductosDB');
const {ContenedorMensajeSQL} = require("../src/Clases/ClasesDB/MensajesDB");




const PORT =  8080;
const folder = path.join(__dirname, "views");
const app = express();


const server =  app.listen(PORT,()=>console.log("listening on port " + PORT));
app.use(express.static(__dirname + "/public"));

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.engine("handlebars",handlebars.engine());

app.set("views", folder);
app.set('view engine', 'handlebars');

const io = new Server(server);
 
const messages =[];
io.on("connection",async(socket)=>{
   
    console.log("Nuevo Cliente Conectado!");
    const todo = await productos.getAll();
      io.sockets.emit("todosProduct", todo); 
      const allchat = await chatLog.getAll();
      io.sockets.emit("messagesChat",allchat);

    socket.on("newProducto",async(data)=>{
      await  productos.save(data);
      const todo = await productos.getAll();
      io.sockets.emit("todosProduct", todo);
    })

    socket.emit("messagesChat", messages)
    socket.on("newMsg", async (data)=>{
    const fechaFormat = moment().format('MMMM Do YYYY, h:mm:ss a');
    newdata ={
        ...data,
        fecha: fechaFormat
    }
    console.log(newdata);
    await chatLog.save(newdata);
    // Enviamos mensajes a todos los users conectados
    io.sockets.emit("messagesChat", messages )
     
})
    })

    app.get("/", async(req,res) => {
        res.render("productos");
    });
    app.get("/productos", async(req,res) => {
         res.render("listado",{total: await productos.getAll()})
    });
    









const productos = new ContenedorProdSQL(options.mysql, "productos");
const chatLog = new ContenedorMensajeSQL(options.sqlite, "Chat");