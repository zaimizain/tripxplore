const express = require('express');
const router = express.Router();
const uAPI = require("../controllers/UserController");
const multer = require('multer');

const{signupUser,loginUser} = require('../controllers/UserController')

// login route
router.post("/login",loginUser)

// signup route
router.post("/signup",signupUser)


module.exports = router;