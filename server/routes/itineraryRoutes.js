const express = require('express');
const router = express.Router();
const iAPI = require("../controllers/ItineraryController");
// const multer = require('multer');

// let storage = multer.diskStorage({
//     destination: function(req, file, cb){
//         cb(null, './uploads');
//     },
//     filename: function(req,file,cb){
//         cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
//     },
// });

// let upload = multer({
//     storage: storage,
// }).single("image");

router.get("/",iAPI.fetchAllItinerary);
// router.post("/",upload, iAPI.createItinerary);
router.post("/", iAPI.createItinerary);
// router.patch("/:id",upload,iAPI.updateItinerary);
router.patch("/:id",iAPI.updateItinerary);
router.delete("/:id",iAPI.deleteItinerary);


module.exports = router;