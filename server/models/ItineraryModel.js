
const mongoose = require('mongoose');

const itinerarySchema = mongoose.Schema({
  startDate: Date,
  endDate: Date,
    created: {
        type:Date,
        default: Date.now
    }

});
module.exports = mongoose.model("Itinerary", itinerarySchema);