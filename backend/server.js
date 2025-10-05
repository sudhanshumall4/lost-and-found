import express from "express";
import mongoose from "mongoose"
import itemRoutes from './routes/itemRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import cors from "cors"
import dotenv from "dotenv"

dotenv.config();

const app=express();
app.use(cors());
app.use(express.json());

// FIX: The route path was missing a leading slash.
// Without "/", the path is not correctly registered, and incoming
// requests to "/api/items" will not be matched.
app.use("/api/items",itemRoutes);
app.use("/api/admin",adminRoutes);

console.log("Mongo URI:", process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.error("❌ MongoDB connection error:", err));

// FIX: This is a duplicate route registration from above and can be safely removed.
// app.use("/api/items", itemRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));