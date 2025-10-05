import mongoose from "mongoose";
import Admin from "./models/adminModel.js";
import dotenv from "dotenv";

dotenv.config();

async function setupAdmin() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    
    console.log("✅ MongoDB Connected");

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ username: "admin" });
    
    if (existingAdmin) {
      console.log("⚠️  Default admin user already exists");
      console.log("Username: admin");
      console.log("If you need to reset the password, please delete the existing admin and run this script again.");
    } else {
      // Create default admin user
      const defaultAdmin = new Admin({
        username: "admin",
        password: "admin123" // This will be hashed automatically by the pre-save middleware
      });

      await defaultAdmin.save();
      
      console.log("✅ Default admin user created successfully!");
      console.log("Username: admin");
      console.log("Password: admin123");
      console.log("⚠️  IMPORTANT: Please change the default password after first login!");
    }

  } catch (error) {
    console.error("❌ Setup failed:", error);
  } finally {
    // Close the database connection
    mongoose.connection.close();
    process.exit(0);
  }
}

setupAdmin();