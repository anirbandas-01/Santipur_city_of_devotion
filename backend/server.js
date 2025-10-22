import express from 'express';
import dotenv from "dotenv";
import cors from "cors";
import connectDB from './config/db.js';
import clubRoutes from './routes/clubRoutes.js';
import userRoutes from './routes/userRoutes.js';


dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));


app.use("/api/clubs", clubRoutes);
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));
