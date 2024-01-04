
const mongoose = require('mongoose');

const locationSchema = mongoose.Schema({
  location: String,
  placeName: String,
    created: {
        type:Date,
        default: Date.now
    }

});
module.exports = mongoose.model("Location", locationSchema);