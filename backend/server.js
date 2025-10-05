import express from "express";
import mongoose from "mongoose"
import itemRoutes from './routes/itemRoutes.js';
import cors from "cors"
import dotenv from "dotenv"

dotenv.config();

const app=express();
app.use(cors());
app.use(express.json());
app.use("api/items",itemRoutes);
console.log("Mongo URI:", process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI, { 
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.error("❌ MongoDB connection error:", err));
app.use("/api/items", itemRoutes);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
