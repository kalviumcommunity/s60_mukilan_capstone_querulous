const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require('./Routes');

require('dotenv').config();

const port = process.env.PORT || 5001;
const MONGO_URL = process.env.MONGO_URL;

app.use(cors());
app.use(express.json());
app.use('/api/user', userRoutes);

app.get("/", (req, res) => {
    res.send("Hello, World!")
});

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URL);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
};

connectDB();

app.listen(port, () => {
    console.log(`Server connected successfully on port ${port}`);
});
