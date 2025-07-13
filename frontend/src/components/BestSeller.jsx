import ProductCard from "./ProductCard";
import { useAppContext } from "../context/AppContext";

const BestSeller = () => {
  const { products } = useAppContext();

  // Get best selling products (you can modify this logic based on your requirements)
  const bestSellingProducts = products
    .filter((product) => product.inStock)
    .slice(0, 10); // Show more products for better selection

  return (
    <div className="mt-16 px-4 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
          Best Sellers
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover our most popular products loved by thousands of customers
        </p>
        <div className="w-24 h-1 bg-green-600 mx-auto mt-4 rounded-full"></div>
      </div>

      {/* Products Grid */}
      {bestSellingProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {bestSellingProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        // Empty State
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No Products Available</h3>
          <p className="text-gray-600">Check back later for our best selling products!</p>
        </div>
      )}

      {/* View All Button */}
      {bestSellingProducts.length > 0 && (
        <div className="text-center mt-12">
          <button
            onClick={() => {
              window.location.href = "/products";
              scrollTo(0, 0);
            }}
            className="inline-flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white font-medium px-8 py-3 rounded-full transition-colors duration-200 shadow-md hover:shadow-lg"
          >
            View All Products
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </button>
        </div>
      )} <br/><br/><br/>
    </div>
  );
};
export default BestSeller;
