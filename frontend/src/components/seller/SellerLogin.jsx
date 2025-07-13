import toast from "react-hot-toast";
import { useAppContext } from "../../context/AppContext";
import React, { useState, useEffect } from "react";
import { assets } from "../../assets/assets";
const SellerLogin = () => {
  const { isSeller, setIsSeller, navigate, axios } = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    if (isSeller) {
      navigate("/seller");
    }
  }, [isSeller]);
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const { data } = await axios.post("/api/seller/login", {
        email,
        password,
      });
      if (data.success) {
        setIsSeller(true);
        navigate("/seller");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      if (error.response?.status === 401 || error.response?.status === 400) {
        toast.error("Invalid credentials. Please check your email and password.");
      } else if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };
  return (
    !isSeller && (
      <div 
        className="fixed top-0 left-0 bottom-0 right-0 z-30 flex items-center justify-center bg-black/60 backdrop-blur-sm text-gray-600 p-4"
        style={{
          backgroundImage: `url(${assets.main_banner_bg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Blur overlay */}
        <div className="absolute inset-0 backdrop-blur-sm bg-black/30"></div>
        
        <form
          onSubmit={handleSubmit}
          className="relative z-10 flex flex-col gap-4 m-auto items-start p-6 py-8 w-full max-w-sm rounded-xl shadow-2xl border border-gray-200 bg-white/95 backdrop-blur-sm overflow-hidden"
        >
          {/* Background decoration */}
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-green-500 to-green-700"></div>
          
          {/* Header */}
          <div className="w-full text-center mb-1">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">
              <span className="text-green-700">Seller</span> Portal
            </h2>
            <p className="text-gray-500 mt-1 text-sm">
              Access your seller dashboard
            </p>
          </div>

          {/* Form Fields */}
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <div className="relative">
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
              </svg>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder="Enter your email address"
                className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors bg-gray-50 focus:bg-white"
                type="email"
                required
              />
            </div>
          </div>

          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                placeholder="Enter your password"
                className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors bg-gray-50 focus:bg-white"
                type="password"
                required
              />
            </div>
          </div>

          {/* Action Button */}
          <button className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-2.5 rounded-lg font-medium transition-all duration-200 transform hover:scale-[1.02] focus:ring-4 focus:ring-green-200 shadow-lg">
            Access Dashboard
          </button>
        </form>
      </div>
    )
  );
};
export default SellerLogin;
