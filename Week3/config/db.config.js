const mongoose = require('mongoose');

const connectDB = async () => {
   try {
     if (mongoose.connection.readyState >= 1) return;
     
     // 1. Fail early if MONGO_URI is missing in production
     if (!process.env.MONGO_URI && process.env.NODE_ENV === 'production') {
         throw new Error("Production MONGO_URI is missing from environment variables!");
     }
     
     // 2. Use the environment variable, or default to local for development

     const dbURI = process.env.MONGO_URI || process.env.MONGO_URL || "mongodb://localhost:27017/ShopHub";
     
     await mongoose.connect(dbURI);
     
     console.log("Database Connected Successfully:", mongoose.connection.name);
   } catch (error) {
     console.error("Database connection error:", error.message || error);
     
     // Your logic here is great—it prevents crashing a live production container 
     // but kills local dev so you can fix it immediately.
     if (process.env.NODE_ENV !== 'production') {
         process.exit(1);
     }
   }
}

module.exports = connectDB;