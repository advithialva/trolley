import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const ProductCard = ({ product }) => {
  const { addToCart, removeFromCart, cartItems, navigate } = useAppContext();
  
  const discountPercentage = Math.round(((product.price - product.offerPrice) / product.price) * 100);
  
  return (
    product && (
      <div className="group bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer">
        {/* Product Image Section */}
        <div
          onClick={() => {
            navigate(
              `/product/${product.category.toLowerCase()}/${product?._id}`
            );
            scrollTo(0, 0);
          }}
          className="relative p-4 bg-gray-50/50"
        >
          {/* Discount Badge */}
          {discountPercentage > 0 && (
            <div className="absolute top-2 left-2 z-10">
              <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                -{discountPercentage}%
              </span>
            </div>
          )}
          
          {/* Wishlist Button */}
          <div className="absolute top-2 right-2 z-10">
            <button className="w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-sm">
              <svg className="w-4 h-4 text-gray-400 hover:text-red-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
              </svg>
            </button>
          </div>

          {/* Product Image */}
          <div className="flex items-center justify-center h-40">
            <img
              className="group-hover:scale-110 transition-transform duration-300 max-h-full max-w-full object-contain"
              src={
                typeof product.image[0] === 'string' && product.image[0].startsWith('http') 
                  ? product.image[0] 
                  : typeof product.image[0] === 'string'
                  ? `http://localhost:4000/images/${product.image[0]}`
                  : product.image[0]
              }
              alt={product.name}
              loading="lazy"
            />
          </div>
        </div>

        {/* Product Info Section */}
        <div className="p-4 space-y-3">
          {/* Category */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full capitalize">
              {product.category}
            </span>
            
            {/* Quick View Button */}
            <button 
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/product/${product.category.toLowerCase()}/${product?._id}`);
                scrollTo(0, 0);
              }}
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-gray-400 hover:text-green-600"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
              </svg>
            </button>
          </div>

          {/* Product Name */}
          <div
            onClick={() => {
              navigate(
                `/product/${product.category.toLowerCase()}/${product?._id}`
              );
              scrollTo(0, 0);
            }}
          >
            <h3 className="text-gray-900 font-semibold text-base leading-tight line-clamp-2 hover:text-green-600 transition-colors cursor-pointer">
              {product.name}
            </h3>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5">
              {Array(5)
                .fill("")
                .map((_, i) => (
                  <svg
                    key={i}
                    className={`w-3.5 h-3.5 ${i < 4 ? 'text-yellow-400' : 'text-gray-300'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                ))}
            </div>
            <span className="text-xs text-gray-500">(4.0)</span>
          </div>

          {/* Price Section */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-bold text-green-700">
                  ₹{product.offerPrice}
                </span>
                {product.price > product.offerPrice && (
                  <span className="text-sm text-gray-500 line-through">
                    ₹{product.price}
                  </span>
                )}
              </div>
              <span className="text-xs text-gray-500">Free delivery</span>
            </div>

            {/* Add to Cart Button */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="flex items-center"
            >
              {!cartItems?.[product?._id] ? (
                <button
                  onClick={() => addToCart(product?._id)}
                  className="flex items-center justify-center gap-1.5 bg-green-600 hover:bg-green-700 text-white font-medium px-3 py-2 rounded-lg transition-colors duration-200 text-sm shadow-sm hover:shadow-md"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 11-4 0v-6m4 0V9a2 2 0 10-4 0v4.01"/>
                  </svg>
                  Add
                </button>
              ) : (
                <div className="flex items-center bg-green-50 border border-green-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => removeFromCart(product?._id)}
                    className="flex items-center justify-center w-8 h-8 text-green-700 hover:bg-green-100 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"/>
                    </svg>
                  </button>
                  <span className="w-8 text-center text-sm font-medium text-green-700">
                    {cartItems[product?._id]}
                  </span>
                  <button
                    onClick={() => addToCart(product?._id)}
                    className="flex items-center justify-center w-8 h-8 text-green-700 hover:bg-green-100 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ProductCard;
