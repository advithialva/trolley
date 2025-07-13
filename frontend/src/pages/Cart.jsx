import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Cart = () => {
  const {
    products,
    navigate,
    cartCount,
    totalCartAmount,
    cartItems,
    setCartItems,
    removeFromCart,
    updateCartItem,
    axios,
    user,
    setShowUserLogin,
  } = useAppContext();

  // state to store the products available in cart
  const [cartArray, setCartArray] = useState([]);
  // state to address
  const [address, setAddress] = useState([]);
  const [showAddress, setShowAddress] = useState(false);
  // state for selected address
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentOption, setPaymentOption] = useState("COD");
  const [isLoading, setIsLoading] = useState(false);

  const getCart = () => {
    let tempArray = [];
    for (const key in cartItems) {
      const product = products.find((product) => product._id === key);
      if (product) {
        product.quantity = cartItems[key];
        tempArray.push(product);
      }
    }
    setCartArray(tempArray);
  };

  const getAddress = async () => {
    try {
      const { data } = await axios.get("/api/address/get");
      if (data.success) {
        setAddress(data.addresses);
        if (data.addresses.length > 0) {
          setSelectedAddress(data.addresses[0]);
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (user) getAddress();
  }, [user]);

  useEffect(() => {
    if (products.length > 0 && cartItems) getCart();
  }, [products, cartItems]);

  const placeOrder = async () => {
    try {
      if (!selectedAddress) {
        return toast.error("Please select an address");
      }
      
      setIsLoading(true);
      
      if (paymentOption === "COD") {
        const { data } = await axios.post("/api/order/cod", {
          items: cartArray.map((item) => ({
            product: item._id,
            quantity: item.quantity,
          })),
          address: selectedAddress._id,
        });
        
        if (data.success) {
          toast.success(data.message);
          setCartItems({});
          navigate("/my-orders");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleStartShopping = () => {
    if (!user) {
      setShowUserLogin(true);
    } else {
      navigate("/products");
    }
  };

  return (
    <div className="min-h-screen bg-white pt-10 px-1 sm:px-3">
      <div className="max-w-6xl mx-auto py-2 sm:py-4">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm mb-3 sm:mb-5 overflow-x-auto">
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
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 11-4 0v-6m4 0V9a2 2 0 10-4 0v4.01"/>
            </svg>
            Shopping Cart
          </span>
        </nav>

        {products.length > 0 && cartItems && cartCount() > 0 ? (
          <div className="flex flex-col xl:flex-row gap-3 sm:gap-6">
            {/* Cart Items Section */}
            <div className="flex-1 bg-white rounded-xl sm:rounded-2xl shadow-xl border border-gray-300 p-2 sm:p-5 lg:p-6">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-2 sm:gap-3">
                <div>
                  <h1 className="text-lg sm:text-2xl lg:text-3xl font-bold text-gray-800">
                    Shopping Cart
                  </h1>
                  <p className="text-gray-600 mt-0.5 sm:mt-1 text-xs sm:text-base">
                    {cartCount()} {cartCount() === 1 ? 'item' : 'items'} in your cart
                  </p>
                </div>
                <div className="hidden sm:block">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 11-4 0v-6m4 0V9a2 2 0 10-4 0v4.01"/>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Cart Items */}
              <div className="space-y-2 sm:space-y-4">
                {cartArray.map((product, index) => (
                  <div
                    key={product._id}
                    className="flex flex-col gap-2 sm:gap-3 p-2 sm:p-4 bg-gray-100 rounded-lg sm:rounded-xl hover:bg-gray-200 transition-colors duration-200"
                  >
                    {/* Product Image & Basic Info */}
                    <div className="flex items-center gap-2 sm:gap-3 flex-1">
                      <div
                        onClick={() => {
                          navigate(`/product/${product.category.toLowerCase()}/${product._id}`);
                          scrollTo(0, 0);
                        }}
                        className="cursor-pointer w-12 h-12 sm:w-20 sm:h-20 lg:w-24 lg:h-24 flex items-center justify-center border border-gray-200 rounded-lg sm:rounded-xl overflow-hidden bg-white hover:shadow-md transition-shadow duration-200 flex-shrink-0"
                      >
                        <img
                          className="w-full h-full object-cover"
                          src={`http://localhost:4000/images/${product.image[0]}`}
                          alt={product.name}
                          loading="lazy"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 text-sm sm:text-lg truncate">
                          {product.name}
                        </h3>
                        <p className="text-gray-500 text-xs capitalize mt-0.5 sm:mt-1">
                          {product.category}
                        </p>
                      </div>
                    </div>

                    {/* Quantity Controls & Price */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1 sm:gap-2">
                        <span className="text-xs font-medium text-gray-600 whitespace-nowrap">Qty:</span>
                        <div className="flex items-center bg-white border border-gray-200 rounded-md sm:rounded-lg overflow-hidden">
                          <button
                            onClick={() => updateCartItem(product._id, Math.max(1, cartItems[product._id] - 1))}
                            className="px-1.5 py-1 sm:px-3 sm:py-2 hover:bg-gray-50 transition-colors"
                            disabled={cartItems[product._id] <= 1}
                          >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"/>
                            </svg>
                          </button>
                          <span className="px-1.5 py-1 sm:px-4 sm:py-2 font-medium text-gray-800 min-w-[1.5rem] sm:min-w-[3rem] text-center text-xs sm:text-sm">
                            {cartItems[product._id]}
                          </span>
                          <button
                            onClick={() => updateCartItem(product._id, cartItems[product._id] + 1)}
                            className="px-1.5 py-1 sm:px-3 sm:py-2 hover:bg-gray-50 transition-colors"
                          >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                            </svg>
                          </button>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="text-right flex-shrink-0">
                        <p className="text-sm sm:text-lg font-bold text-gray-900">
                          {formatPrice(product.offerPrice * product.quantity)}
                        </p>
                        <p className="text-xs text-gray-500 hidden sm:block">
                          {formatPrice(product.offerPrice)} × {product.quantity}
                        </p>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(product._id)}
                        className="p-1 sm:p-2 text-red-500 hover:bg-red-50 rounded-md sm:rounded-lg transition-colors duration-200 flex-shrink-0"
                        title="Remove item"
                      >
                        <svg className="w-3 h-3 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Continue Shopping */}
              <div className="mt-4 sm:mt-8 pt-3 sm:pt-6 border-t border-gray-200">
                <button
                  onClick={() => navigate("/products")}
                  className="flex items-center gap-1 sm:gap-2 text-green-600 hover:text-green-700 font-medium transition-colors duration-200 text-sm sm:text-base"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16l-4-4m0 0l4-4m-4 4h18"/>
                  </svg>
                  Continue Shopping
                </button>
              </div>
            </div>

            {/* Order Summary Section */}
            <div className="w-full xl:w-80">
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl border border-gray-300 p-2 sm:p-5 lg:p-6 sticky top-20 sm:top-24">
                <h2 className="text-base sm:text-xl font-bold text-gray-800 mb-3 sm:mb-6">Order Summary</h2>
                
                {/* Delivery Address */}
                <div className="mb-3 sm:mb-6">
                  <div className="flex items-center gap-1 sm:gap-2 mb-2 sm:mb-3">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                    <h3 className="font-semibold text-gray-800 text-sm sm:text-base">Delivery Address</h3>
                  </div>
                  
                  <div className="relative">
                    <div className="bg-gray-100 rounded-lg p-2 sm:p-4 mb-2 sm:mb-3">
                      <p className="text-gray-700 text-xs sm:text-sm leading-relaxed">
                        {selectedAddress
                          ? `${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state}, ${selectedAddress.country}`
                          : "No Address Found"}
                      </p>
                    </div>
                    
                    <button
                      onClick={() => setShowAddress(!showAddress)}
                      className="text-green-600 hover:text-green-700 font-medium text-xs sm:text-sm transition-colors duration-200"
                    >
                      Change Address
                    </button>
                    
                    {showAddress && (
                      <div className="absolute top-full mt-2 left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
                        {address.map((addr, index) => (
                          <button
                            key={index}
                            onClick={() => {
                              setSelectedAddress(addr);
                              setShowAddress(false);
                            }}
                            className="w-full text-left p-3 hover:bg-gray-50 transition-colors duration-200 text-sm border-b border-gray-100 last:border-b-0"
                          >
                            {addr.street}, {addr.city}, {addr.state}, {addr.country}
                          </button>
                        ))}
                        <button
                          onClick={() => navigate("/add-address")}
                          className="w-full text-left p-3 text-green-600 hover:bg-green-50 transition-colors duration-200 text-sm font-medium"
                        >
                          + Add New Address
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Payment Method */}
                <div className="mb-3 sm:mb-6">
                  <div className="flex items-center gap-1 sm:gap-2 mb-2 sm:mb-3">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
                    </svg>
                    <h3 className="font-semibold text-gray-800 text-sm sm:text-base">Payment Method</h3>
                  </div>
                  
                  <select
                    onChange={(e) => setPaymentOption(e.target.value)}
                    value={paymentOption}
                    className="w-full border border-gray-200 bg-white px-3 py-2 sm:px-4 sm:py-3 rounded-lg outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                  >
                    <option value="COD">Cash On Delivery</option>
                    <option value="Online">Online Payment</option>
                  </select>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-1.5 sm:space-y-3 mb-3 sm:mb-6">
                  <div className="flex justify-between text-gray-600 text-xs sm:text-sm">
                    <span>Subtotal ({cartCount()} items)</span>
                    <span>{formatPrice(totalCartAmount())}</span>
                  </div>
                  <div className="flex justify-between text-gray-600 text-xs sm:text-sm">
                    <span>Shipping Fee</span>
                    <span className="text-green-600 font-medium">Free</span>
                  </div>
                  <div className="flex justify-between text-gray-600 text-xs sm:text-sm">
                    <span>Tax (2%)</span>
                    <span>{formatPrice((totalCartAmount() * 2) / 100)}</span>
                  </div>
                  <hr className="border-gray-200" />
                  <div className="flex justify-between text-sm sm:text-lg font-bold text-gray-900">
                    <span>Total Amount</span>
                    <span>{formatPrice(totalCartAmount() + (totalCartAmount() * 2) / 100)}</span>
                  </div>
                </div>

                {/* Place Order Button */}
                <button
                  onClick={placeOrder}
                  disabled={isLoading || !selectedAddress}
                  className="w-full py-2.5 sm:py-4 bg-green-700 hover:bg-green-800 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-base"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                      {paymentOption === "COD" ? "Place Order" : "Proceed to Checkout"}
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        ) : (
          // Empty Cart State
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl border border-gray-300 p-4 sm:p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 11-4 0v-6m4 0V9a2 2 0 10-4 0v4.01"/>
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">
                Your cart is empty
              </h2>
              <p className="text-gray-600 mb-8">
                Looks like you haven't added any items to your cart yet. Start shopping to fill it up!
              </p>
              <button
                onClick={handleStartShopping}
                className="bg-green-700 hover:bg-green-800 text-white px-8 py-4 rounded-lg font-semibold transition-colors duration-200 shadow-md hover:shadow-lg"
              >
                Start Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;