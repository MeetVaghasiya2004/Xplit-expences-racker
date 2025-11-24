const connectDB =require("./src/db/connectDB.js")
const express = require("express");
const env = require('dotenv');
const userRouter = require("./src/Routes/user.route.js")
const {server} = require("./app.js");

env.config({
    path:"./.env"
})

connectDB().then(()=>{
    server.listen(process.env.PORT,()=>{
        console.log(`Server is listening on port ${process.env.PORT}`);
    })
})
.catch((err)=>{
    console.log("MONGO DB connection error");
})