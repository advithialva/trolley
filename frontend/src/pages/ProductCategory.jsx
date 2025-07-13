import { categories } from "../assets/assets";
import ProductCard from "../components/ProductCard";
import { useAppContext } from "../context/AppContext";
import { useParams } from "react-router-dom";
const ProductCategory = () => {
  const { products } = useAppContext();
  const { category } = useParams();
  const searchCategory = categories.find(
    (item) => item.path.toLowerCase() === category
  );

  const filteredProducts = products.filter(
    (product) => product.category.toLowerCase() === category
  );
  return (
    <div className="mt-16 px-4 max-w-7xl mx-auto">
      {searchCategory && (
        <div className="mb-8">
          {/* Category Header Section */}
          <div 
            className="relative overflow-hidden rounded-3xl p-8 md:p-12 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 border border-gray-100 shadow-lg"
            style={{ 
              background: `linear-gradient(135deg, ${searchCategory.bgColor}20, ${searchCategory.bgColor}10, #f8fafc)` 
            }}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-4 right-4 w-32 h-32 rounded-full" 
                   style={{ backgroundColor: searchCategory.bgColor }}></div>
              <div className="absolute bottom-4 left-4 w-24 h-24 rounded-full" 
                   style={{ backgroundColor: searchCategory.bgColor }}></div>
            </div>
            
            <div className="relative flex items-center justify-between flex-wrap gap-6">
              {/* Left Content */}
              <div className="flex items-center gap-6">
                {/* Category Icon */}
                <div 
                  className="w-20 h-20 md:w-24 md:h-24 rounded-2xl flex items-center justify-center shadow-lg"
                  style={{ backgroundColor: searchCategory.bgColor }}
                >
                  <img
                    src={searchCategory.image}
                    alt={searchCategory.text}
                    className="w-12 h-12 md:w-16 md:h-16 object-contain"
                  />
                </div>
                
                {/* Category Info */}
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2 tracking-tight">
                    {searchCategory.text}
                  </h1>
                  <p className="text-lg text-gray-600 mb-3">
                    {searchCategory.path === 'Drinks' && 'Refreshing beverages for every moment'}
                    {searchCategory.path === 'Instant' && 'Quick & easy meals for busy days'}
                    {searchCategory.path === 'Vegetables' && 'Farm fresh produce, straight to your table'}
                    {searchCategory.path === 'Fruits' && 'Sweet & nutritious nature\'s candy'}
                    {searchCategory.path === 'Dairy' && 'Pure & healthy dairy essentials'}
                    {searchCategory.path === 'Bakery' && 'Freshly baked goods made with love'}
                    {searchCategory.path === 'Grains' && 'Wholesome nutrition for healthy living'}
                  </p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="bg-white px-4 py-2 rounded-full text-green-700 font-medium shadow-sm">
                      ✓ Fresh Quality
                    </span>
                    <span className="bg-white px-4 py-2 rounded-full text-blue-700 font-medium shadow-sm">
                      {filteredProducts.length} Products
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Right Decorative Element */}
              <div className="hidden md:block">
                <div className="text-6xl opacity-20 transform rotate-12">
                  {searchCategory.path === 'Drinks' && '🥤'}
                  {searchCategory.path === 'Instant' && '🍜'}
                  {searchCategory.path === 'Vegetables' && '🥬'}
                  {searchCategory.path === 'Fruits' && '🍎'}
                  {searchCategory.path === 'Dairy' && '🥛'}
                  {searchCategory.path === 'Bakery' && '🍞'}
                  {searchCategory.path === 'Grains' && '🌾'}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}     
      {filteredProducts.length > 0 ? (
        <div>
          {/* Products Section Header */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Available Products
            </h2>
            <div className="w-16 h-1 bg-green-600 rounded-full"></div>
          </div>
          
          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredProducts.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div><br/><br/><br/>
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="mb-6">
            <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m8-8v2m0 6v2" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">No Products Available</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              We're currently restocking this category. Check back soon for fresh products!
            </p>
          </div>
          <button 
            onClick={() => window.history.back()} 
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
          >
            ← Go Back
          </button>
        </div>
      )}<br/><br/><br/>
    </div>
  );
};
export default ProductCategory;
