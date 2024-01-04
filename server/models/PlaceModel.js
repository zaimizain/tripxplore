// models/User.js


const mongoose = require('mongoose');

const placeSchema = mongoose.Schema({
    activities: String,
    location: String,
    expect:String,
    age: String,
    notes: String,
    budget:String,
    image:String,
    created: {
        type:Date,
        default: Date.now
    }

});
module.exports = mongoose.model("Place", placeSchema);