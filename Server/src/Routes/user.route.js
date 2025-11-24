const express = require("express");
const router = express.Router();
const {handleUserSignUp, handleUserLogin,getUser, logoutUser, changePassword,changeEmail} = require("../controllers/user.controller.js") 
const verifyJWT = require("../middlewares/verifyJWT.js")

router.route("/signup").post(handleUserSignUp);
router.route("/login").post(handleUserLogin);
router.route("/getUser").post(verifyJWT,getUser);
router.route("/logOut").post(verifyJWT,logoutUser);
router.route("/changePassword").post(verifyJWT,changePassword);
router.route("/changeEmail").post(verifyJWT,changeEmail);

module.exports = router