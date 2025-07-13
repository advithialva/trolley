import { categories } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const Category = () => {
  const { navigate } = useAppContext();

  const handleCategoryClick = (category) => {
    navigate(`/products/${category.path.toLowerCase()}`);
    scrollTo(0, 0);
  };

  return (
    <div className="mt-16 px-4 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
          Shop by Categories
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Browse through our wide range of fresh groceries and daily essentials
        </p>
        <div className="w-24 h-1 bg-green-600 mx-auto mt-4 rounded-full"></div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4 md:gap-6">
        {categories.map((category, index) => (
          <div
            key={index}
            className="group cursor-pointer bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 p-4 md:p-6 transition-all duration-300 hover:-translate-y-2 hover:scale-105 min-h-[140px] md:min-h-[160px] flex flex-col justify-center"
            onClick={() => handleCategoryClick(category)}
          >
            {/* Category Image Container */}
            <div 
              className="rounded-xl p-3 md:p-4 mb-3 md:mb-4 flex items-center justify-center aspect-square"
              style={{ backgroundColor: category.bgColor }}
            >
              <img
                src={category.image}
                alt={category.text}
                className="w-10 h-10 md:w-14 md:h-14 object-contain transition-transform duration-300 group-hover:scale-110"
                loading="lazy"
              />
            </div>
            
            {/* Category Name */}
            <h3 className="text-sm md:text-lg font-extrabold text-gray-800 text-center group-hover:text-green-600 transition-all duration-500 leading-tight group-hover:scale-110 transform tracking-wide uppercase text-shadow-sm">
              {category.text}
            </h3>
            
            {/* Subtitle for better description */}
            <p className="text-xs text-gray-500 text-center mt-1 group-hover:text-green-500 transition-colors duration-300">
              {category.path === 'Drinks' && 'Refreshing beverages'}
              {category.path === 'Instant' && 'Quick & easy meals'}
              {category.path === 'Vegetables' && 'Farm fresh produce'}
              {category.path === 'Fruits' && 'Sweet & nutritious'}
              {category.path === 'Dairy' && 'Pure & healthy'}
              {category.path === 'Bakery' && 'Freshly baked goods'}
              {category.path === 'Grains' && 'Wholesome nutrition'}
            </p>
            
            {/* Hover Effect Indicator */}
            <div className="w-0 group-hover:w-8 h-0.5 bg-green-600 transition-all duration-300 mx-auto mt-2 md:mt-3 rounded-full"></div>
          </div>
        ))}
      </div>

      {/* Featured Categories Highlight */}
      <div className="mt-12 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 md:p-8">
        <div className="text-center">
          <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
            🌟 Fresh & Quality Guaranteed
          </h3>
          <p className="text-gray-600 mb-4">
            All our products are sourced from trusted suppliers and delivered fresh to your doorstep
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <span className="bg-white px-4 py-2 rounded-full text-green-700 font-medium shadow-sm">
              ✓ Farm Fresh Vegetables
            </span>
            <span className="bg-white px-4 py-2 rounded-full text-blue-700 font-medium shadow-sm">
              ✓ Organic Options
            </span>
            <span className="bg-white px-4 py-2 rounded-full text-purple-700 font-medium shadow-sm">
              ✓ Fast Delivery
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Category;
