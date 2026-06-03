const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    
    await mongoose.connect("mongodb://localhost:27017/ShopHub");
    console.log("Database Connected Successfully!",mongoose.connection.name);
  } catch (error) {
    console.error("Database Connection Error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;