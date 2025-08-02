import dotenv from "dotenv";
import { connectDB } from "./config/connectDB.js";
import Product from "./models/product.model.js";

dotenv.config();

const checkProducts = async () => {
  try {
    await connectDB();
    
    const products = await Product.find({}).limit(3);
    
    console.log("📦 Sample products:");
    products.forEach(product => {
      console.log(`\n🥕 ${product.name}`);
      console.log(`   Images: ${product.image.length}`);
      product.image.forEach((img, i) => {
        console.log(`   ${i + 1}. ${img}`);
      });
    });
    
  } catch (error) {
    console.error("❌ Error:", error);
  } finally {
    process.exit(0);
  }
};

checkProducts();
