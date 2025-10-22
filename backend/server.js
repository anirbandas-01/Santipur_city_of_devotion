import express from 'express';
import dotenv from "dotenv";
import cors from "cors";
import connectDB from './config/db.js';
import clubRoutes from './routes/clubRoutes.js';
import userRoutes from './routes/userRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js'
import mongoose from 'mongoose';

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));


app.use("/api/clubs", clubRoutes);
app.use("/api/users", userRoutes);
app.use("/api/reviews", reviewRoutes);

mongoose
   .connect(process.env.MONGO_URI)
   .then(()=> console.log("MongoDB connected"))
   .catch((err)=> console.error("MongoDB connection error:", err));

app.get("/", ( req, res) => {
    res.send("Backend working");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));
