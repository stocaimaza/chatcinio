const express = require("express");
const app = express(); 
const PUERTO = 8080; 
const exphbs = require("express-handlebars");
const viewsRouter = require("./routes/views.router"); 
const socket = require("socket.io");

//Middleware
app.use(express.static("./src/public"));

//Handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars"); 
app.set("views", "./src/views"); 

//Routing
app.use("/", viewsRouter);
const httpServer = app.listen(PUERTO);

//socket.io

const io = new socket.Server(httpServer); 

let messages = [];


io.on("connection", (socket)=> {
    console.log("Nuevo usuario conectado");

    socket.on("message", data => {
        //mi console: 
        console.log(data);
        messages.push(data);
        io.emit("messagesLogs", messages);
    })
})
