// Add this route to your backend (Express.js)
// PUT /api/admin/fix-categories

const express = require('express');
const router = express.Router();
const Product = require('../models/product.model'); // Adjust path as needed

router.put('/fix-categories', async (req, res) => {
  try {
    console.log('Starting category standardization...');
    
    const categoryUpdates = [
      { from: 'Beverages', to: 'Drinks' },
      { from: 'Packaged Foods', to: 'Instant' },
      { from: 'Organic veggies', to: 'Vegetables' },
      { from: 'Fresh Fruits', to: 'Fruits' },
      { from: 'Dairy Products', to: 'Dairy' },
      { from: 'Bakery & Breads', to: 'Bakery' },
      { from: 'Grains & Cereals', to: 'Grains' }
    ];
    
    const results = [];
    
    for (const update of categoryUpdates) {
      const result = await Product.updateMany(
        { category: update.from },
        { $set: { category: update.to } }
      );
      
      results.push({
        from: update.from,
        to: update.to,
        updated: result.modifiedCount
      });
      
      console.log(`Updated ${result.modifiedCount} products: ${update.from} → ${update.to}`);
    }
    
    // Get final category distribution
    const finalCategories = await Product.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);
    
    res.json({
      success: true,
      message: 'Categories standardized successfully',
      updates: results,
      finalCategories: finalCategories,
      totalProductsUpdated: results.reduce((sum, r) => sum + r.updated, 0)
    });
    
  } catch (error) {
    console.error('Error fixing categories:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fix categories',
      error: error.message
    });
  }
});

module.exports = router;
