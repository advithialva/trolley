import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

// Load environment variables
dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const testCloudinary = async () => {
  try {
    console.log("🧪 Testing Cloudinary connection...");
    console.log("Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME);
    console.log("API Key:", process.env.CLOUDINARY_API_KEY);
    
    // Test API connection
    const pingResult = await cloudinary.api.ping();
    console.log("✅ Ping successful:", pingResult);
    
    // Create a test image (simple 1x1 pixel)
    const testImageData = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==';
    
    const uploadResult = await cloudinary.uploader.upload(testImageData, {
      resource_type: "image",
      folder: "grocery-app/test",
      public_id: "connection_test",
      overwrite: true,
    });
    
    console.log("✅ Upload successful!");
    console.log("URL:", uploadResult.secure_url);
    
    // Test if the URL is accessible
    const response = await fetch(uploadResult.secure_url);
    console.log("📡 URL Response Status:", response.status);
    
    if (response.status === 200) {
      console.log("🎉 Image is accessible!");
    } else {
      console.log("❌ Image is not accessible");
    }
    
    // Clean up test image
    await cloudinary.uploader.destroy(`grocery-app/test/connection_test`);
    console.log("🧹 Test image cleaned up");
    
  } catch (error) {
    console.error("❌ Error:", error.message);
  }
};

testCloudinary();
