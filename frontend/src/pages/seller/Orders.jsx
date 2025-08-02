import { useContext, useEffect, useState } from "react";
import { AppContext, useAppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";
import toast from "react-hot-toast";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const { axios } = useContext(AppContext);

  const updatePaymentStatus = async (orderId) => {
    try {
      const { data } = await axios.put(`/api/order/update-payment/${orderId}`, {
        isPaid: true
      });
      
      if (data.success) {
        toast.success("Payment status updated successfully!");
        // Update the local state
        setOrders(orders.map(order => 
          order._id === orderId 
            ? { ...order, isPaid: true }
            : order
        ));
      } else {
        toast.error(data.message || "Failed to update payment status");
      }
    } catch (error) {
      toast.error(error.message || "Failed to update payment status");
    }
  };

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get("/api/order/seller");
      if (data.success) {
        setOrders(data.orders);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const getStatusBadge = (isPaid) => {
    return isPaid ? (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
        Paid
      </span>
    ) : (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
        </svg>
        Pending
      </span>
    );
  };

  const formatDate = (dateString) => {
    try {
      if (!dateString) return 'Date not available';
      
      const date = new Date(dateString);
      
      // Check if date is valid
      if (isNaN(date.getTime())) {
        return 'Invalid date';
      }
      
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return 'Date not available';
    }
  };

  const filteredOrders = orders.filter(order => {
    if (filter === "paid") return order.isPaid;
    if (filter === "pending") return !order.isPaid;
    return true;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-48 mb-6"></div>
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-lg p-6 mb-4">
                <div className="h-6 bg-gray-300 rounded w-full mb-4"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Orders Management</h1>
                <p className="text-gray-600">{orders.length} total orders</p>
              </div>
            </div>

            {/* Filter Buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => setFilter("all")}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === "all"
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                All Orders
              </button>
              <button
                onClick={() => setFilter("paid")}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === "paid"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Paid
              </button>
              <button
                onClick={() => setFilter("pending")}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === "pending"
                    ? "bg-yellow-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Pending
              </button>
            </div>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
              <p className="text-gray-500">
                {filter === "all" ? "You haven't received any orders yet." : `No ${filter} orders found.`}
              </p>
            </div>
          ) : (
            filteredOrders.map((order, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
                {/* Order Header */}
                <div className="border-b border-gray-100 p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">ORDER #{(order._id?.slice(-8) || (index + 1).toString().padStart(8, '0')).toUpperCase()}</h3>
                        <p className="text-sm text-gray-500">{formatDate(order.orderDate || order.createdAt || order.date)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      {getStatusBadge(order.isPaid)}
                      <span className="text-xl font-bold text-gray-900">₹{order.amount}</span>
                    </div>
                  </div>
                </div>

                {/* Order Content */}
                <div className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Products */}
                    <div className="lg:col-span-2">
                      <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                        Products ({order.items.length})
                      </h4>
                      <div className="space-y-3">
                        {order.items.map((item, itemIndex) => (
                          <div key={itemIndex} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                            <img
                              className="w-12 h-12 object-cover rounded-lg"
                              src={
                                typeof item.product.image[0] === 'string' && item.product.image[0].startsWith('http') 
                                  ? item.product.image[0] 
                                  : typeof item.product.image[0] === 'string'
                                  ? `http://localhost:4000/images/${item.product.image[0]}`
                                  : item.product.image[0]
                              }
                              alt={item.product.name}
                            />
                            <div className="flex-1">
                              <p className="font-medium text-gray-900">{item.product.name}</p>
                              <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium text-gray-900">₹{item.product.offerPrice}</p>
                              <p className="text-sm text-gray-500">each</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Customer & Payment Info */}
                    <div className="space-y-6">
                      {/* Customer Details */}
                      <div>
                        <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          Delivery Address
                        </h4>
                        <div className="text-sm text-gray-700 space-y-1">
                          {order.address ? (
                            <>
                              <p className="font-medium">{order.address.firstName} {order.address.lastName}</p>
                              <p>{order.address.street}</p>
                              <p>{order.address.city}, {order.address.state}</p>
                              <p>{order.address.zipCode || order.address.zipcode}, {order.address.country}</p>
                            </>
                          ) : (
                            <p className="text-gray-500 italic">Address information not available</p>
                          )}
                        </div>
                      </div>

                      {/* Payment Details */}
                      <div>
                        <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                          </svg>
                          Payment Info
                        </h4>
                        <div className="text-sm text-gray-700 space-y-3">
                          <div className="flex justify-between">
                            <span>Method:</span>
                            <span className="font-medium capitalize">{order.paymentType}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Status:</span>
                            {getStatusBadge(order.isPaid)}
                          </div>
                          
                          {/* Mark as Paid Button for COD orders */}
                          {!order.isPaid && order.paymentType?.toLowerCase() === 'cod' && (
                            <div className="pt-2">
                              <button
                                onClick={() => updatePaymentStatus(order._id)}
                                className="w-full px-3 py-2 bg-green-600 hover:bg-green-700 text-white text-xs font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Mark as Paid
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
export default Orders;
