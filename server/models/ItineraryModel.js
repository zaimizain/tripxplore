const mongoose = require('mongoose');

const itinerarySchema = mongoose.Schema({
  startDate: Date,
  endDate: Date,
  activity:String,
  location:String,
  created: {
    type: Date,
    default: Date.now
  }
});

// Customize the JSON serialization to format the date as required
itinerarySchema.set('toJSON', {
  transform: function (doc, ret) {
    ret.startDate = formatDate(ret.startDate);
    ret.endDate = formatDate(ret.endDate);
    ret.time = formatDate(ret.time);
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

module.exports = mongoose.model("Itinerary", itinerarySchema);
