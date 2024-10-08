const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const postRoutes = require("./routes/postRoutes")
const userRoutes = require("./routes/userRoutes");
const publicRoutes = require("./routes/publicRoutes");
const { authenticate } = require("./middleware/auth");

require("dotenv").config();

const port = process.env.PORT || 5002;
const MONGO_URL = process.env.MONGO_URL;

app.use(cookieParser());
app.use(cors({
  origin: ["http://localhost:5173","https://onrender.com","https://netlify.app", "https://66f7b045e1063b861f74f7dd--statuesque-maamoul-4a9521.netlify.app","https://statuesque-maamoul-4a9521.netlify.app"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
}));
app.use(express.json());
app.use("/api/user", userRoutes);
app.use("/api/posts", authenticate, postRoutes);
app.use("/api/getallposts",publicRoutes)
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

connectDB();

app.listen(port, () => {
  console.log(`Server connected successfully on port ${port}`);
});
