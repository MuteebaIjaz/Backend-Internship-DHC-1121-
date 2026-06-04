const mongoose = require('mongoose');

const connectDB = async () => {
   try {
     if (mongoose.connection.readyState >= 1) return;
     
     
     if (!process.env.MONGO_URI && process.env.NODE_ENV === 'production') {
         throw new Error("Production MONGO_URI is missing from environment variables!");
     }
     
     

     const dbURI = process.env.MONGO_URI || process.env.MONGO_URL || "mongodb://localhost:27017/ShopHub";
     
     await mongoose.connect(dbURI);
     
     console.log("Database Connected Successfully:", mongoose.connection.name);
   } catch (error) {
     console.error("Database connection error:", error.message || error);
     
     
     if (process.env.NODE_ENV !== 'production') {
         process.exit(1);
     }
   }
}

module.exports = connectDB;