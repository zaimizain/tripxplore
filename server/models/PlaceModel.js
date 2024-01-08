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

placeSchema.set('toJSON', {
    transform: function (doc, ret) {
      ret.created = formatDate(ret.created);
      return ret;
    }
  });

function formatDate(date) {
    if (date instanceof Date) {
      return date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }) +
        ', ' + date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
    }
    return date; // Return as is if not a valid date
  }
module.exports = mongoose.model("Place", placeSchema);