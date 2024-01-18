const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/your_database_name', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
   console.log('Connected to MongoDB');
});

// Define Schema and Model (assuming you have a schema named 'Itinerary')
const itinerarySchema = new mongoose.Schema({
   startDate: Date,
   endDate: Date,
   location: String,
   name: String,
   days: [
      {
         activities: String,
         time: String,
         budget: Number
      }
   ]
});

const Itinerary = mongoose.model('Itinerary', itinerarySchema);

// Express Routes
app.post('/api/saveItinerary', (req, res) => {
   const newItinerary = new Itinerary(req.body);
   newItinerary.save((err) => {
      if (err) {
         res.status(500).send(err);
      } else {
         res.status(200).send('Itinerary saved successfully!');
      }
   });
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
   console.log(`Server is running on port ${port}`);
});
