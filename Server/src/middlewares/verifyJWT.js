const ApiError =require("../utils/ApiError.js");
const jwt = require("jsonwebtoken");
const  User =require("../models/user.model.js");
const ApiResponse = require("../utils/ApiResponse.js");

const verifyJWT = async(req, _, next) => {

    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")

        if (token) {
            const decodedToken = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
            if(decodedToken){
                const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
                if(user){
                    req.user = user;
                }
            }
        }
        next()
        
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token")
    }   
}

module.exports = verifyJWT