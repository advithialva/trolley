import Product from "../models/product.model.js";
import { v2 as cloudinary } from "cloudinary";

// add product :/api/product/add
export const addProduct = async (req, res) => {
  try {
    const { name, price, offerPrice, description, category } = req.body;
    
    if (!name || !price || !offerPrice || !description || !category || !req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "All fields including images are required",
      });
    }

    // Check if we should use Cloudinary (if env vars are set)
    const useCloudinary = process.env.CLOUDINARY_CLOUD_NAME && 
                          process.env.CLOUDINARY_API_KEY && 
                          process.env.CLOUDINARY_API_SECRET;

    let imageUrls = [];

    if (useCloudinary) {
      // Upload to Cloudinary
      console.log("Uploading images to Cloudinary...");
      for (const file of req.files) {
        try {
          const result = await cloudinary.uploader.upload(file.path, {
            resource_type: "image",
            folder: "grocery-app/products",
          });
          imageUrls.push(result.secure_url);
          console.log("Uploaded to Cloudinary:", result.secure_url);
        } catch (uploadError) {
          console.error("Error uploading to Cloudinary:", uploadError);
          return res.status(500).json({
            success: false,
            message: "Error uploading images to cloud storage",
          });
        }
      }
    } else {
      // Fallback to local storage (not recommended for production)
      console.log("Using local storage (not recommended for production)");
      imageUrls = req.files.map((file) => file.filename);
    }

    const product = new Product({
      name,
      price,
      offerPrice,
      description,
      category,
      image: imageUrls,
    });

    const savedProduct = await product.save();

    return res.status(201).json({
      success: true,
      product: savedProduct,
      message: "Product added successfully",
    });
  } catch (error) {
    console.error("Error in addProduct:", error);

    return res
      .status(500)
      .json({ success: false, message: "Server error while adding product" });
  }
};

// get products :/api/product/get
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, products });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
// get single product :/api/product/id
export const getProductById = async (req, res) => {
  try {
    const { id } = req.body;
    const product = await Product.findById(id);
    res.status(200).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
// change stock  :/api/product/stock
export const changeStock = async (req, res) => {
  try {
    const { id, inStock } = req.body;
    const product = await Product.findByIdAndUpdate(
      id,
      { inStock },
      { new: true }
    );
    res
      .status(200)
      .json({ success: true, product, message: "Stock updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// delete product :/api/product/delete/:id
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required",
      });
    }

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("Error in deleteProduct:", error);
    res.status(500).json({
      success: false,
      message: "Server error while deleting product",
    });
  }
};
