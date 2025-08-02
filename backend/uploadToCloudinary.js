import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";
import { connectDB } from "./config/connectDB.js";
import Product from "./models/product.model.js";

// Load environment variables
dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadExistingImages = async () => {
  try {
    console.log("Uploading existing images to Cloudinary...");
    
    // Connect to database
    await connectDB();
    console.log("Connected to database");

    // Check uploads folder
    const uploadsPath = path.join(process.cwd(), "uploads");
    if (!fs.existsSync(uploadsPath)) {
      console.log("❌ Uploads folder not found!");
      return;
    }

    const files = fs.readdirSync(uploadsPath);
    const imageFiles = files.filter(file => 
      file.match(/\.(jpg|jpeg|png|gif|webp)$/i)
    );

    console.log(`Found ${imageFiles.length} images in uploads folder`);

    // Upload each image to Cloudinary
    for (const filename of imageFiles) {
      try {
        const filePath = path.join(uploadsPath, filename);
        console.log(`Uploading ${filename}...`);
        
        const result = await cloudinary.uploader.upload(filePath, {
          resource_type: "image",
          folder: "grocery-app/products",
          public_id: filename.split('.')[0], // Use filename without extension as public_id
          overwrite: true,
        });

        console.log(`✅ Uploaded: ${result.secure_url}`);

        // Update any products that use this image
        const productsWithImage = await Product.find({
          image: { $in: [filename] }
        });

        for (const product of productsWithImage) {
          const updatedImages = product.image.map(img => 
            img === filename ? result.secure_url : img
          );
          
          await Product.findByIdAndUpdate(product._id, {
            image: updatedImages
          });
          
          console.log(`  Updated product: ${product.name}`);
        }

      } catch (error) {
        console.error(`Failed to upload ${filename}:`, error.message);
      }
    }

    console.log("Upload completed!");

  } catch (error) {
    console.error("Error:", error);
  } finally {
    process.exit(0);
  }
};

uploadExistingImages();
