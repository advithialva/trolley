import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const MyOrders = () => {
  const [myOrders, setMyOrders] = useState([]);
  const [expandedOrders, setExpandedOrders] = useState({});
  const { axios, user, navigate } = useContext(AppContext);

  const toggleOrderExpansion = (orderIndex) => {
    setExpandedOrders(prev => ({
      ...prev,
      [orderIndex]: !prev[orderIndex]
    }));
  };
  const fetchOrders = async () => {
    try {
      const { data } = await axios.get("/api/order/user");
      if (data.success) {
        setMyOrders(data.orders);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);
  return (
    <div className="min-h-screen bg-white pt-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2 text-sm mb-6">
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
            My Orders
          </span>
        </nav>

        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
              </svg>
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                My Orders
              </h1>
              <p className="text-gray-600 mt-1">Track and manage your order history</p>
            </div>
          </div>
          
          {/* Order Summary Stats */}
          {myOrders.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{myOrders.length}</p>
                    <p className="text-sm text-gray-600">Total Orders</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">
                      {myOrders.filter(order => order.status === 'Delivered').length}
                    </p>
                    <p className="text-sm text-gray-600">Delivered</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">
                      ₹{myOrders.reduce((total, order) => total + order.amount, 0)}
                    </p>
                    <p className="text-sm text-gray-600">Total Spent</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {myOrders.length > 0 ? (
          <div className="space-y-4">
            {myOrders.map((order, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300"
              >
                {/* Order Header - Always Visible */}
                <div 
                  className="bg-gradient-to-r from-green-50 to-green-100 px-6 py-4 border-b border-green-200 cursor-pointer hover:from-green-100 hover:to-green-150 transition-all duration-200"
                  onClick={() => toggleOrderExpansion(index)}
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500 mb-1">Order ID</p>
                        <p className="font-mono text-sm bg-white px-3 py-2 rounded-lg border border-gray-300 font-bold text-gray-800 shadow-sm">
                          #{order._id.slice(-8).toUpperCase()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500 mb-1">Payment Method</p>
                        <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium bg-blue-100 text-blue-800 border border-blue-200">
                          {order.paymentType}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500 mb-1">Status</p>
                        <span className={`inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium border ${
                          order.status === 'Delivered' 
                            ? 'bg-green-100 text-green-800 border-green-200' 
                            : order.status === 'Processing' 
                            ? 'bg-amber-100 text-amber-800 border-amber-200'
                            : order.status === 'Shipped'
                            ? 'bg-blue-100 text-blue-800 border-blue-200'
                            : order.status === 'Order Placed'
                            ? 'bg-slate-100 text-slate-700 border-slate-200'
                            : 'bg-gray-100 text-gray-800 border-gray-200'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-500 mb-1">Total Amount</p>
                        <p className="text-2xl font-bold text-slate-800">₹{order.amount}</p>
                      </div>
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-white rounded-xl border border-gray-200 shadow-sm flex items-center justify-center">
                          <svg 
                            className={`w-5 h-5 text-gray-600 transform transition-transform duration-200 ${
                              expandedOrders[index] ? 'rotate-180' : ''
                            }`} 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Order Summary in Header */}
                  <div className="mt-3 flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
                      </svg>
                      {new Date(order.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
                      </svg>
                      {order.items.length} item{order.items.length > 1 ? 's' : ''}
                    </span>
                    <span className="px-2 py-1 bg-white rounded text-xs">
                      Click to {expandedOrders[index] ? 'collapse' : 'expand'} details
                    </span>
                  </div>
                </div>

                {/* Order Items - Collapsible */}
                <div className={`transition-all duration-500 ease-in-out overflow-hidden ${
                  expandedOrders[index] 
                    ? 'max-h-[2000px] opacity-100' 
                    : 'max-h-0 opacity-0'
                }`}>
                  <div className="divide-y divide-gray-100">
                    {order.items.map((item, itemIndex) => (
                      <div
                        key={itemIndex}
                        className="p-6 flex flex-col lg:flex-row lg:items-center gap-6 animate-fadeIn"
                      >
                        {/* Product Info */}
                        <div className="flex items-center gap-4 flex-1">
                          <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                            <img
                              src={
                                typeof item.product.image[0] === 'string' && item.product.image[0].startsWith('http') 
                                  ? item.product.image[0] 
                                  : typeof item.product.image[0] === 'string'
                                  ? `http://localhost:4000/images/${item.product.image[0]}`
                                  : item.product.image[0]
                              }
                              alt={item.product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-900 text-lg truncate">
                              {item.product.name}
                            </h3>
                            <p className="text-gray-500 text-sm capitalize">
                              {item.product.category}
                            </p>
                            <p className="text-gray-600 text-sm mt-1">
                              Quantity: <span className="font-medium">{item.quantity || 1}</span>
                            </p>
                          </div>
                        </div>

                        {/* Order Details */}
                        <div className="flex flex-col sm:flex-row gap-6 lg:gap-8">
                          <div className="text-center lg:text-left">
                            <p className="text-sm font-medium text-gray-600 mb-1">Order Date</p>
                            <p className="text-sm text-gray-700">
                              {new Date(order.createdAt).toLocaleDateString('en-IN', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric'
                              })}
                            </p>
                            <p className="text-xs text-gray-500">
                              {new Date(order.createdAt).toLocaleTimeString('en-IN', {
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </p>
                          </div>

                          <div className="text-center lg:text-right">
                            <p className="text-sm font-medium text-gray-600 mb-1">Item Total</p>
                            <p className="text-lg font-bold text-gray-900">
                              ₹{item.product.offerPrice * item.quantity}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {/* Order Actions */}
                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                      <div className="flex flex-col sm:flex-row gap-3 justify-between items-center">
                        <div className="text-sm text-gray-500">
                          Order placed on {new Date(order.createdAt).toLocaleDateString('en-IN')}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                          </svg>
                          <span>{order.status}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Empty State
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="text-8xl mb-6">📦</div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                No orders yet
              </h2>
              <p className="text-gray-600 mb-6">
                You haven't placed any orders yet. Start shopping to see your orders here!
              </p>
              <button
                onClick={() => navigate("/products")}
                className="bg-green-700 text-white px-8 py-3 rounded-lg font-medium hover:bg-green-800 transition-colors"
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
export default MyOrders;
