import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { useAppContext } from "../context/AppContext";
import { categories } from "../assets/assets";

const Products = () => {
  const { products, searchQuery, setSearchQuery } = useAppContext();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("priceLow");

  useEffect(() => {
    let updated = [...products]; // Create a copy

    // Apply category filter first
    if (selectedCategory !== "All") {
      const categoryMapping = {
        "Drinks": ["Cold Drinks", "Beverages", "Drinks", "Soft Drinks"],
        "Instant": ["Instant Food", "Instant", "Ready to Cook", "Packaged Foods"],
        "Vegetables": ["Vegetables", "Veggie", "Organic veggies"],
        "Fruits": ["Fruits", "Fresh Fruits", "Fruit"],
        "Dairy": ["Dairy", "Dairy Products", "Dairy Product"],
        "Bakery": ["Bakery", "Bakery & Breads", "Bread"],
        "Grains": ["Grains", "Grains & Cereals", "Cereals"]
      };
      
      if (categoryMapping[selectedCategory]) {
        updated = updated.filter((product) => 
          categoryMapping[selectedCategory].some(catName => 
            product.category?.toLowerCase() === catName.toLowerCase()
          )
        );
      } else {
        // Fallback to exact match
        updated = updated.filter(
          (product) => product.category === selectedCategory
        );
      }
    }

    // Apply search filter
    if (searchQuery.length > 0) {
      updated = updated.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort products
    updated = updated.sort((a, b) => {
      switch (sortBy) {
        case "priceLow":
          return (a.offerPrice || 0) - (b.offerPrice || 0); 
        case "priceHigh":
          return (b.offerPrice || 0) - (a.offerPrice || 0); 
        case "newest":
          return new Date(b.createdAt || 0) - new Date(a.createdAt || 0); 
        default:
          return new Date(b.createdAt || 0) - new Date(a.createdAt || 0); 
      }
    });

    setFilteredProducts(updated);
  }, [products, searchQuery, selectedCategory, sortBy]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSortBy("priceLow");
  };

  const inStockProducts = filteredProducts.filter((product) => product.inStock);

  return (
    <div className="min-h-screen bg-white pt-10">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-2">
        <nav className="flex items-center space-x-2 text-sm mb-4">
          <a 
            href="/" 
            className="text-gray-500 hover:text-green-600 transition-colors flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
            </svg>
            Home
          </a>
          <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"/>
          </svg>
          <span className="text-green-600 font-medium flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
            </svg>
            All Products
          </span>
        </nav>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 pb-4">
        {/* Page Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
              </svg>
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                All Products
              </h1>
              <p className="text-gray-600 mt-1">
                {inStockProducts.length} products available
                {selectedCategory !== "All" && ` in ${categories.find(cat => cat.path === selectedCategory)?.text}`}
                {searchQuery && ` matching "${searchQuery}"`}
              </p>
            </div>
          </div>

          {/* Filters Bar */}
          <div className="rounded-lg shadow-lg border border-gray-300 p-4 mb-4">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              {/* Search and Category */}
              <div className="flex flex-col sm:flex-row gap-4 flex-1">
                <div className="relative flex-1 max-w-md">
                  <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                  </svg>
                  <input
                    type="text"
                    placeholder="Search for products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 w-full"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                      </svg>
                    </button>
                  )}
                </div>

                <div className="relative">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-white appearance-none cursor-pointer w-full sm:w-48 pr-10"
                  >
                    <option value="All">All Categories</option>
                    {categories.map((cat) => (
                      <option key={cat.path} value={cat.path}>
                        {cat.text}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Sort and Controls */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-white appearance-none cursor-pointer pr-10"
                  >
                    <option value="priceLow">Price: Low to High</option>
                    <option value="priceHigh">Price: High to Low</option>
                    <option value="newest">Newest First</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {/* Clear Filters */}
                {(searchQuery || selectedCategory !== "All" || sortBy !== "priceLow") && (
                  <button
                    onClick={clearFilters}
                    className="px-4 py-3 text-gray-600 hover:text-green-600 border border-gray-300 rounded-lg hover:border-green-300 transition-colors duration-200 flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                    </svg>
                    Clear
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="bg-white rounded-lg shadow-2xl border border-gray-300 p-4">
          {inStockProducts.length > 0 ? (
            <>
              <div className="flex items-center justify-between mb-4">
                <p className="text-gray-600">
                  Showing <span className="font-semibold">{inStockProducts.length}</span> of{" "}
                  <span className="font-semibold">{products.filter(p => p.inStock).length}</span> products
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {inStockProducts.map((product, index) => (
                  <ProductCard key={product._id || index} product={product} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                No products found
              </h3>
              <p className="text-gray-600 mb-4 max-w-md mx-auto">
                We couldn't find any products matching your search criteria. Try adjusting your filters or search terms.
              </p>
              <button
                onClick={clearFilters}
                className="inline-flex items-center gap-2 px-4 py-2 bg-green-700 text-white font-medium rounded-lg hover:bg-green-800 transition-colors duration-200"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                </svg>
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </div><br/><br/><br/>
    </div>
  );
};

export default Products;
