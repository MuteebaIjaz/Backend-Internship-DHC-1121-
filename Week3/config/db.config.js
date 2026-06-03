const mongoose = require('mongoose');

const connectDB = async () => {
   try {
     if (mongoose.connection.readyState >= 1) return;
     
     // Pull the URI directly inside the connect statement
     await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/ShopHub");
     
     console.log("Database Connected Successfully:", mongoose.connection.name);
   } catch (error) {
     // No variables are referenced here except the native error object, completely preventing ReferenceErrors
     console.error("Database connection error:", error.message || error);
     
     if (process.env.NODE_ENV !== 'production') {
         process.exit(1);
     }
   }
}

module.exports = connectDB;