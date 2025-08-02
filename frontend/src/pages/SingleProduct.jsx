import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { Link, useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import ProductCard from "../components/ProductCard";

const SingleProduct = () => {
  const { products, navigate, addToCart } = useAppContext();
  const { id } = useParams();
  const [thumbnail, setThumbnail] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const product = products.find((product) => product._id === id);
  console.log("product", product);
  
  useEffect(() => {
    if (products.length > 0 && product) {
      let productsCopy = products.slice();
      // Filter products from the same category, excluding current product
      productsCopy = productsCopy.filter(
        (p) => p.category === product.category && p._id !== product._id && p.inStock
      );
      setRelatedProducts(productsCopy.slice(0, 5));
    }
  }, [products, product]);

  useEffect(() => {
    setThumbnail(product?.image[0] ? product.image[0] : null);
  }, [product]);
  
  return (
    product && (
      <div className="min-h-screen bg-white-50 pt-10">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 py-4">
          <nav className="flex items-center space-x-2 text-sm mb-6">
            <Link 
              to="/" 
              className="text-gray-500 hover:text-green-600 transition-colors flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
              </svg>
              Home
            </Link>
            <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"/>
            </svg>
            <Link 
              to="/products" 
              className="text-gray-500 hover:text-green-600 transition-colors"
            >
              Products
            </Link>
            <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"/>
            </svg>
            <Link 
              to={`/products/${product.category.toLowerCase()}`}
              className="text-gray-500 hover:text-green-600 transition-colors capitalize"
            >
              {product.category}
            </Link>
            <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"/>
            </svg>
            <span className="text-green-600 font-medium flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 2C5.58 2 2 5.58 2 10s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
              </svg>
              <span className="truncate max-w-[200px]" title={product.name}>
                {product.name}
              </span>
            </span>
          </nav>
        </div>

        {/* Main Product Section */}
        <div className="max-w-5xl mx-auto px-4 pb-4">
          <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-300 hover:shadow-xl transition-shadow duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
              {/* Product Images */}
              <div className="space-y-2">
                {/* Main Image */}
                <div className="aspect-square bg-gray-50 rounded-md overflow-hidden border border-gray-100">
                  <img
                    src={
                      typeof thumbnail === 'string' && thumbnail.startsWith('http') 
                        ? thumbnail 
                        : typeof thumbnail === 'string'
                        ? `${import.meta.env.VITE_BACKEND_URL}/images/${product.image[0]}`
                        : thumbnail
                    }
                    alt="Selected product"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Thumbnail Gallery */}
                <div className="flex gap-1.5 overflow-x-auto pb-1">
                  {product.image.map((image, index) => (
                    <div
                      key={index}
                      onClick={() => setThumbnail(image)}
                      className={`flex-shrink-0 w-14 h-14 bg-gray-50 rounded-sm overflow-hidden border cursor-pointer transition-all duration-200 ${
                        thumbnail === image 
                          ? 'border-green-500 ring-1 ring-green-200' 
                          : 'border-gray-200 hover:border-green-300'
                      }`}
                    >
                      <img
                        src={
                          typeof image === 'string' && image.startsWith('http') 
                            ? image 
                            : typeof image === 'string'
                            ? `http://localhost:4000/images/${image}`
                            : image
                        }
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Product Details */}
              <div className="space-y-4">
                <div>
                  <h1 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2">
                    {product.name}
                  </h1>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center">
                      {Array(5)
                        .fill("")
                        .map((_, i) => (
                          <img
                            src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                            alt="star"
                            key={i}
                            className="w-4 h-4"
                          />
                        ))}
                    </div>
                    <span className="text-gray-600 text-sm">(4.0) • 124 reviews</span>
                  </div>

                  {/* Category Badge */}
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 capitalize">
                    {product.category}
                  </span>
                </div>

                {/* Pricing */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="space-y-2">
                    <p className="text-sm text-gray-500 line-through">
                      MRP: ₹{product.price}
                    </p>
                    <div className="flex items-baseline gap-3">
                      <span className="text-2xl font-bold text-green-700">₹{product.offerPrice}</span>
                      <span className="bg-green-100 text-green-800 text-sm font-medium px-2 py-1 rounded">
                        {Math.round(((product.price - product.offerPrice) / product.price) * 100)}% OFF
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">(inclusive of all taxes)</p>
                  </div>
                </div>

                {/* Product Description */}
                <div className="space-y-3">
                  <h3 className="text-base font-semibold text-gray-900">About This Product</h3>
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <ul className="space-y-2">
                      {product.description.map((desc, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                          <span className="text-green-500 mt-1 flex-shrink-0">•</span>
                          <span>{desc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3 pt-2">
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => addToCart(product._id)}
                      className="flex items-center justify-center gap-2 py-3 px-4 bg-white border-2 border-green-700 text-green-700 font-semibold rounded-lg hover:bg-green-50 transition-colors duration-200"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 11-4 0v-6m4 0V9a2 2 0 10-4 0v4.01" />
                      </svg>
                      Add to Cart
                    </button>
                    <button
                      onClick={() => {
                        addToCart(product._id);
                        navigate("/cart");
                        scrollTo(0, 0);
                      }}
                      className="flex items-center justify-center gap-2 py-3 px-4 bg-green-700 text-white font-semibold rounded-lg hover:bg-green-800 transition-colors duration-200"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      Buy Now
                    </button>
                  </div>
                  
                  {/* Trust Indicators */}
                  <div className="flex items-center justify-center gap-4 py-3 border-t border-gray-200">
                    <div className="flex items-center gap-1.5 text-sm text-gray-600">
                      <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Quality Assured
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-gray-600">
                      <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                        <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1V8a1 1 0 00-1-1h-3z" />
                      </svg>
                      Free Delivery
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-gray-600">
                      <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                      </svg>
                      Easy Returns
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Related Products Section */}
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="text-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-1">You Might Also Like</h2>
            <p className="text-gray-600 text-sm">Discover more products from the same category</p>
            <div className="w-16 h-0.5 bg-gradient-to-r from-green-400 to-green-600 rounded-full mx-auto mt-3"></div>
          </div>

          {relatedProducts.filter((product) => product.inStock).length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-6">
                {relatedProducts
                  .filter((product) => product.inStock)
                  .slice(0, 5)
                  .map((product, index) => (
                    <div key={index} className="transform hover:scale-105 transition-transform duration-200">
                      <ProductCard product={product} />
                    </div>
                  ))}
              </div>
              
              <div className="text-center">
                <button
                  onClick={() => {
                    navigate("/products");
                    scrollTo(0, 0);
                  }}
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-green-700 text-white font-semibold rounded-lg hover:bg-green-800 transition-colors duration-200 shadow-md hover:shadow-lg"
                >
                  <span>Explore More Products</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No Related Products Found</h3>
              <p className="text-gray-600 mb-6">Check out our other amazing products instead!</p>
              <button
                onClick={() => {
                  navigate("/products");
                  scrollTo(0, 0);
                }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-green-700 text-white font-medium rounded-lg hover:bg-green-800 transition-colors"
              >
                Browse All Products
              </button>
            </div>
          )}
        </div>
      </div>
    )
  );
};
export default SingleProduct;
