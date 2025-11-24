const TransactionChat = require("../models/transactionChat.model");
const User = require("../models/user.model");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const {getIO}= require("../../io.js")

const onlineUsers={};

async function HandleVerifyAddUser(req,res){
    try{
        const reqUser = req.user;
        if(!reqUser){
            return res.status(401).json(new ApiResponse(401,{},"You are not logged in to transaction"));
        }
        const {email} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json(new ApiResponse(400,{},"User not exist"));
        }

        const userDB = await User.findById(reqUser._id);

        userDB.userList.push({username:user.name,email});
        await userDB.save({validateBeforeSave:false});

        user.userList.push({username : userDB.name,email : userDB.email});
        await user.save({validateBeforeSave:false});

        await TransactionChat.create({
            firstPersonEmail : userDB.email,
            secondPersonEmail : email, 
            transactions :[],
            total : 0
        });

        return res.status(200).json(new ApiResponse(200,{username:user.name},"Success"));
    }
    catch(err){
        console.log("error : ",err);
        throw new ApiError(500,"Failed to transaction");
    }
}

async function HandleLoadUserList(req,res){
    try{
        const reqUser = req.user;
        if(!reqUser){
            return res.status(401).json(new ApiResponse(401,{},"You are not logged in to transaction"));
        }
        const userDB = await User.findById(reqUser._id);
        return res.status(200).json(new ApiResponse(200,userDB.userList,"transaction loaded successfully"));
    }
    catch(err){ 
        console.log("error : ",err)
        throw new ApiError(500,"Failed to Load List");
    }
}

async function HandleAddTransaction(req,res){
    try{
        const reqUser = req.user;
        if(!reqUser){
            return res.status(401).json(new ApiResponse(401,{},"You are not logged in to transaction"));
        }

        const userDB = await User.findById(reqUser._id);
        const firstPerson = userDB.email;
        const secondPerson = req.body.recieverEmail;

        let chat = await TransactionChat.findOne({firstPersonEmail : firstPerson,secondPersonEmail:secondPerson});
        if(!chat){
            chat=await TransactionChat.findOne({firstPersonEmail : secondPerson,secondPersonEmail:firstPerson}); 
        }
        let {amount,note} = req.body;
        if(amount==''){
            amount=0;
        }
        else{
            amount=parseInt(amount);
        }

        const msg={
            amount,
            note,
            sendBy:firstPerson,
            createdAt : new Date()
        }
        
        chat.transactions.push(msg);
        
        if(chat.firstPersonEmail == firstPerson) chat.total += amount;
        else chat.total -= amount;
        await chat.save({validateBeforeSave:false});

        const io=getIO();

        if(onlineUsers[secondPerson]){
            io.to(onlineUsers[secondPerson]).emit("transaction-added",msg);
        }

        return res.status(200).json(new ApiResponse(200,{},"transaction loaded successfully"));
    }
    catch(err){
        console.log("error : ",err)
        throw new ApiError(500,"Failed to add transaction");
    }
}

async function HandleLoadTransactions(req,res){
    try{
        const reqUser = req.user;
        if(!reqUser){
            return res.status(401).json(new ApiResponse(401,{},"You are not logged in to transaction"));
        }

        const userDB = await User.findById(reqUser._id);
        const firstPerson = userDB.email;
        const secondPerson = req.body.recieverEmail;
        let chat = await TransactionChat.findOne({firstPersonEmail : firstPerson,secondPersonEmail:secondPerson});
        if(!chat){
            chat=await TransactionChat.findOne({firstPersonEmail : secondPerson,secondPersonEmail:firstPerson}); 
        }
        if(chat){
            return res.status(200).json(new ApiResponse(200,chat.transactions,"Success"));
        }
        return res.status(500).json(new ApiResponse(500,[],"Server error"));
    }
    catch(err){
        console.log("error : ",err)
        throw new ApiError(500,"Failed to add transaction");
    }
}

async function HandleAddOnlineUser(req,res){
    try{
        const reqUser = req.user;
        if(!reqUser){
            return res.status(401).json(new ApiResponse(401,{},"You are not logged in to transaction"));
        }

        const email = req.user.email;
        const socketId=req.body.socketId;

        onlineUsers[email]=socketId;
        console.log(onlineUsers);
        
        return res.status(200).json(new ApiResponse(200,{},"User added to online list"));
    }
    catch(err){
        console.log("error : ",err)
        throw new ApiError(500,"Failed to add Online User");
    }
}

async function HandleTotalSum(req,res){
    try{
        const reqUser = req.user;
        if(!reqUser){
            return res.status(401).json(new ApiResponse(401,{},"You are not logged in to transaction"));
        }

        const userDB = await User.findById(reqUser._id);
        const firstPerson = userDB.email;
        const secondPerson = req.body.recieverEmail;

        let chat = await TransactionChat.findOne({firstPersonEmail : firstPerson,secondPersonEmail:secondPerson});
        if(!chat){
            chat=await TransactionChat.findOne({firstPersonEmail : secondPerson,secondPersonEmail:firstPerson}); 
        }
        let total = 0;
        let firstPers = "";
        if(chat) {
            total = chat.total;
            firstPers = chat.firstPersonEmail;
        }
        return res.status(200).json(new ApiResponse(200,{total,firstPerson:userDB.email,firstPers},"success"));
    }
    catch(err){
        console.log("error: ", err);
        throw new ApiError(500,"Failed to give total of users");
    }
}

module.exports = {
    HandleVerifyAddUser,
    HandleLoadUserList,
    HandleAddTransaction,
    HandleLoadTransactions,
    HandleAddOnlineUser,
    HandleTotalSum
};