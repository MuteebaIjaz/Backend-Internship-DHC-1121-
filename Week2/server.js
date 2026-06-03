const express = require("express");
const path = require("path");
const connectDB = require("./Config/db.config");
const productRoutes = require("./routes/Shophub.route");

const app = express();

const PORT = process.env.PORT || 3000;

// Connect Database
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static Files
app.use(express.static(path.join(__dirname, "public")));

// View Engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Routes
app.use("/", productRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).render("404");
});


app.listen(PORT, () => {
    console.log(`[Server] Running at http://localhost:${PORT}`);
});
