const express = require('express');
const router = express.Router();
const lAPI = require("../controllers/LocationController");


router.get("/",lAPI.fetchAllLocation);
router.get("/:id",lAPI.fetchLocationByID);
router.post("/", lAPI.createLocation);
router.patch("/:id",lAPI.updateLocation);
router.delete("/:id",lAPI.deleteLocation);

module.exports = router;