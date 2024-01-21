// models/Day.js
const mongoose = require('mongoose');

const itinerarySchema = new mongoose.Schema({
  
  // image: { 
  //   type: String, 
  //   required: true },
 
    location: { 
      type: String, 
      required: true },

      itineraryName: { 
        type: String, 
        required: true },

  startDate: { 
    type: Date, 
    required: true },

    endDate: { 
      type: Date,
      required: true },
 
  newDay: [{
    date: { 
    type: Date, 
    required: true },
  
    activities: [
      {
        time: { 
          type: String, 
          required: true },
  
        activity: { 
          type: String, 
          required: true },

          expect: { 
            type: String, 
            required: true },

            age: { 
              type: String, 
              required: true },

              locationDetails: { 
                type: String, 
                required: true },

                note: { 
                  type: String, 
                  required: true },

                  budget: { 
                    type: String, 
                    required: true },

          // image: { 
          //   type: String, 
          //   required: true },
      },
    ]}] ,
});

itinerarySchema.set('toJSON', {
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

module.exports = mongoose.model('Itinerary', itinerarySchema);
