const express = require('express');
const router = express.Router();
const pAPI = require("../controllers/PlaceController");
const multer = require('multer');

// multen middleware
let storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads');
    },
    filename: function(req,file,cb){
        cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    },
});

let upload = multer({
    storage: storage,
}).single("image");

router.get("/",pAPI.fetchAllPlace);
router.get("/:id",pAPI.fetchPlaceByID);
router.post("/",upload, pAPI.createPlace);
router.patch("/:id",upload ,pAPI.updatePlace);
router.delete("/:id",pAPI.deletePlace);

module.exports = router;