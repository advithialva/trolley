import dotenv from "dotenv";
import { connectDB } from "./config/connectDB.js";
import Product from "./models/product.model.js";

// Load environment variables
dotenv.config();

const fixCloudinaryUrls = async () => {
  try {
    console.log("🔧 Fixing Cloudinary URLs...");
    
    // Connect to database
    await connectDB();
    console.log("✅ Connected to database");

    // Get all products with wrong cloud name
    const products = await Product.find({
      image: { $regex: "dojbgnqpt" }
    });

    console.log(`📦 Found ${products.length} products with incorrect cloud name`);

    const correctCloudName = process.env.CLOUDINARY_CLOUD_NAME;
    console.log(`🎯 Correct cloud name: ${correctCloudName}`);

    let fixedCount = 0;

    for (const product of products) {
      const updatedImages = product.image.map(imageUrl => {
        if (imageUrl.includes('dojbgnqpt')) {
          return imageUrl.replace('dojbgnqpt', correctCloudName);
        }
        return imageUrl;
      });

      await Product.findByIdAndUpdate(product._id, {
        image: updatedImages
      });

      console.log(`✅ Fixed: ${product.name}`);
      console.log(`   Old: ${product.image[0]}`);
      console.log(`   New: ${updatedImages[0]}`);
      fixedCount++;
    }

    console.log(`🎉 Fixed ${fixedCount} products!`);

  } catch (error) {
    console.error("❌ Error:", error);
  } finally {
    process.exit(0);
  }
};

fixCloudinaryUrls();
