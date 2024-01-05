//imports 
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require('./routes/userRoutes') 
const { ClerkExpressWithAuth } = require('@clerk/clerk-sdk-node') 

const app = express();
const port = process.env.PORT // 5000;

//midle~
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use("/images",express.static("uploads"));
// app.use('/api/user', userRoutes)

// database con
mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true
}).then(() => console.log("Connected to the database!")).catch((err) => console.log(err));

//routes prefix
app.use("/api/place",ClerkExpressWithAuth(),require("./routes/placeRoutes"));
app.use("/api/location",ClerkExpressWithAuth(),require("./routes/locationRoutes"));
app.use("/api/itinerary",ClerkExpressWithAuth(),require("./routes/itineraryRoutes"));


// start server
app.listen(port, () => console.log(`server running at http://localhost:${port}`));

