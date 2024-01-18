const express = require('express');
const router = express.Router();
const iAPI = require("../controllers/ItineraryController");


router.post("/", iAPI.createItinerary);
router.get("/",iAPI.fetchAllItinerary);
router.delete("/:id",iAPI.deleteItinerary);
router.patch("/:id",iAPI.updateItinerary);


module.exports = router;