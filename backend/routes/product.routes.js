import express from "express";
import path from "path";
import fs from "fs";

import { authSeller } from "../middlewares/authSeller.js";
import {
  addProduct,
  changeStock,
  deleteProduct,
  getProductById,
  getProducts,
} from "../controller/product.controller.js";
import { upload } from "../config/multer.js";
const router = express.Router();

router.post("/add-product", authSeller, upload.array("image", 4), addProduct);
router.get("/list", getProducts);
router.get("/id", getProductById);
router.post("/stock", authSeller, changeStock);
router.delete("/delete/:id", authSeller, deleteProduct);

// Debug route to check if images exist
router.get("/debug/images", (req, res) => {
  try {
    const uploadsPath = path.join(process.cwd(), "uploads");
    
    if (!fs.existsSync(uploadsPath)) {
      return res.json({
        status: "error",
        message: "Uploads folder does not exist",
        path: uploadsPath,
        cwd: process.cwd()
      });
    }

    const files = fs.readdirSync(uploadsPath);
    const imageFiles = files.filter(file => 
      file.match(/\.(jpg|jpeg|png|gif|webp)$/i)
    );

    res.json({
      status: "success",
      uploadsPath,
      totalFiles: files.length,
      imageFiles: imageFiles.length,
      sampleFiles: files.slice(0, 10),
      environment: process.env.NODE_ENV || "development"
    });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
      stack: error.stack
    });
  }
});

export default router;
