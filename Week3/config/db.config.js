



const mongoose = require('mongoose');

const connectDB = async () => {
     const db_URI = process.env.MONGO_URI || "mongodb://localhost:27017/ShopHub";

   try {
     if (mongoose.connection.readyState >= 1) return;
     
     
     
     await mongoose.connect(dbURI);
     console.log("Database Connected Successfully:", mongoose.connection.name);
   } catch (error) {
     console.error("Database connection error:", error);
     if (process.env.NODE_ENV !== 'production') {
         process.exit(1);
     }
   }
}

module.exports = connectDB;