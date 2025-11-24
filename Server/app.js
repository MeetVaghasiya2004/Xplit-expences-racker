const express= require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const userRouter =require("./src/Routes/user.route.js");
const expenseRouter= require("./src/Routes/expense.route.js")
const transactionRouter = require("./src/Routes/transaction.route.js");
const {Server} = require('socket.io');
const {createServer} = require('http');
const {initializeIO,getIO} = require('./io.js');

const app=express();

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: false, limit: "16kb"}))

app.use(cors({
    origin:"http://localhost:5173",
    credentials: true
}))

app.use(cookieParser())
app.use("/user",userRouter)
app.use("/expense",expenseRouter);
app.use("/transaction",transactionRouter);

const server = new createServer(app);

initializeIO(server)
const io=getIO();

// const io= new Server(server,{
//     cors:{
//         origin:"http://localhost:5173",
//         credentials:true,
//         methods:["GET", "POST"]
//     }
// }
// );

// io.on("connection",(socket)=>{
//     console.log("user connected : ",socket.id);
//     socket.on("disconnect",()=>{
//         console.log("user disconnected : ",socket.id);
//     })
// })

module.exports={server}