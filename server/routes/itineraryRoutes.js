const express = require('express');
const router = express.Router();
const iAPI = require("../controllers/ItineraryController");


router.get("/",iAPI.fetchAllItinerary);
router.get("/:id",iAPI.fetchItineraryByID);
router.post("/", iAPI.createItinerary);
router.patch("/:id",iAPI.updateItinerary);
router.delete("/:id",iAPI.deleteItinerary);

module.exports = router;