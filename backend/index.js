// index.js
import express from "express";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { connectDB } from "./config/connectDB.js";
import { connectCloudinary } from "./config/cloudinary.js";
import userRoutes from "./routes/user.routes.js";
import sellerRoutes from "./routes/seller.routes.js";
import productRoutes from "./routes/product.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import addressRoutes from "./routes/address.routes.js";
import orderRoutes from "./routes/order.routes.js";

dotenv.config();

const app = express();

const __dirname = path.resolve(); 

// Serve static files with proper headers and error handling
app.use("/images", (req, res, next) => {
  const imagePath = path.join(__dirname, "uploads", req.path);
  
  // Set proper headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Check if file exists
  if (!require('fs').existsSync(imagePath)) {
    console.log(`Image not found: ${imagePath}`);
    return res.status(404).json({ 
      error: 'Image not found',
      path: imagePath,
      requested: req.path 
    });
  }
  
  next();
}, express.static(path.join(__dirname, "uploads")));

// CORS setup 
const allowedOrigins = [
  "http://localhost:5173",
  "https://trolley-delivery.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS not allowed for this origin: " + origin));
    }
  },
  credentials: true
}));

// Middleware
app.use(cookieParser());
app.use(express.json());

// Connect services
await connectCloudinary();
connectDB();

// Health check route
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || "development",
    uploadsPath: path.join(process.cwd(), "uploads")
  });
});

// API routes
app.use("/api/user", userRoutes);
app.use("/api/seller", sellerRoutes);
app.use("/api/product", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/address", addressRoutes);
app.use("/api/order", orderRoutes);

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
