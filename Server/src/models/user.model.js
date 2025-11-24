const mongoose = require("mongoose");
const {Schema} = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { type } = require("os");


const userSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    },
    expenseLists:[
        {
            type: Schema.Types.ObjectId,
            ref: "ExpenseList"
        }
    ],
    dateWiseSums:[
        {
            type: Schema.Types.ObjectId,
            ref: "DateWiseSum"
        }
    ],
    monthWiseSums:[
        {
            type: Schema.Types.ObjectId,
            ref: "MonthWiseSum"
        }
    ],
    userList:[
        {
            type: Object
        }
    ]
},{timestamps: true});

userSchema.pre("save",async function (next){
    if(!this.isModified("password")) return next()

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}


userSchema.methods.generateAccessToken=async function (){

    return await jwt.sign(
        {
            _id:this._id,
            email:this.email
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken =async function(){
    return await jwt.sign(
        {
            _id:this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

const User = mongoose.model("User",userSchema);
module.exports = User;