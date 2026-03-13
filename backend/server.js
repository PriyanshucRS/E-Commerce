require("dotenv").config();

const dns = require("node:dns/promises");
dns.setServers(["1.1.1.1"]);

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");


const authRoutes = require("./src/routes/authRoutes");
const productRoutes = require("./src/routes/productRoutes");
const cartRoutes = require("./src/routes/cartRoutes");
const watchlistRoutes = require("./src/routes/watchlistRouter");

const app = express();


const corsOptions = {
  origin: 'https://e-commerce-frontend-c6h2.onrender.com', 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}

app.use(cors(corsOptions));
app.options('/*any', cors(corsOptions));


app.use(express.json());


app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/watchlist", watchlistRoutes);


mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((err) => {
    console.error("MongoDB Connection Error:", err.message);
    process.exit(1); 
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});
