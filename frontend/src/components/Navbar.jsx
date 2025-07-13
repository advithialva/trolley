import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import toast from "react-hot-toast";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const {
    user,
    setUser,
    showUserLogin,
    setShowUserLogin,
    navigate,
    cartCount,
    axios,
  } = useAppContext();

  const logout = async () => {
    try {
      const { data } = await axios.get("/api/user/logout");
      if (data.success) {
        setUser(null);
        navigate("/");
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      if (error.response?.status === 401) {
        setUser(null);
        navigate("/");
        toast.success("Logged out successfully");
      } else {
        toast.error(error.message);
      }
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white transition-all z-50">
      <Link to="/">
        <h2 className="text-2xl font-bold text-green-700">Trolley</h2>
      </Link>

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center gap-8">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>

        <div onClick={() => navigate("/cart")} className="relative cursor-pointer">
          <svg width="18" height="18" viewBox="0 0 14 14" fill="none">
            <path
              d="M.583.583h2.333l1.564 7.81a1.17 1.17 0 0 0 1.166.94h5.67a1.17 1.17 0 0 0 1.167-.94l.933-4.893H3.5m2.333 8.75a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0m6.417 0a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0"
              stroke="#15803d"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <button className="absolute -top-2 -right-3 text-xs text-white bg-green-700 w-[18px] h-[18px] rounded-full">
            {cartCount()}
          </button>
        </div>

        {user ? (
          <div className="relative group">
            <div className="flex items-center gap-2 cursor-pointer p-2 rounded-lg hover:bg-gray-50 transition-colors">
              <img src={assets.profile_icon} alt="Profile" className="w-8 h-8 rounded-full border-2 border-green-200" />
              <div className="hidden lg:block">
                <p className="text-sm font-medium text-gray-900">{user.name || 'User'}</p>
                <p className="text-xs text-gray-500">My Account</p>
              </div>
              <svg className="w-4 h-4 text-gray-400 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            
            <div className="hidden group-hover:block absolute top-12 right-0 bg-white shadow-xl border border-gray-200 rounded-xl z-40 min-w-[280px] overflow-hidden">
              {/* User Info Header */}
              <div className="p-4 bg-gradient-to-r from-green-50 to-green-100 border-b border-green-200">
                <div className="flex items-center gap-3">
                  <img src={assets.profile_icon} alt="Profile" className="w-10 h-10 rounded-full border-2 border-green-300" />
                  <div>
                    <p className="font-semibold text-green-800">{user.name || 'User'}</p>
                    <p className="text-sm text-green-600">{user.email || 'user@example.com'}</p>
                  </div>
                </div>
              </div>
              
              {/* Menu Items */}
              <div className="py-2">
                <button 
                  onClick={() => navigate("/my-orders")} 
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
                >
                  <svg className="w-5 h-5 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <div>
                    <p className="font-medium text-gray-900">My Orders</p>
                    <p className="text-xs text-gray-500">Track your purchases</p>
                  </div>
                </button>
                
                <div className="h-px bg-gray-200 mx-4 my-2"></div>
                
                <button 
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 transition-colors text-left" 
                  onClick={logout}
                >
                  <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <div>
                    <p className="font-medium text-red-600">Sign Out</p>
                    <p className="text-xs text-red-400">Logout from your account</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => {
              setOpen(false);
              setShowUserLogin(true);
            }}
            className="flex items-center gap-2 px-6 py-2 bg-green-700 hover:bg-green-800 transition text-white rounded-full font-medium"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m0 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
            Sign In
          </button>
        )}
      </div>

      {/* Mobile Section */}
      <div className="flex items-center gap-6 md:hidden">
        <div className="relative cursor-pointer" onClick={() => navigate("/cart")}>
          <svg width="18" height="18" viewBox="0 0 14 14" fill="none">
            <path
              d="M.583.583h2.333l1.564 7.81a1.17 1.17 0 0 0 1.166.94h5.67a1.17 1.17 0 0 0 1.167-.94l.933-4.893H3.5m2.333 8.75a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0m6.417 0a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0"
              stroke="#15803d"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <button className="absolute -top-2 -right-3 text-xs text-white bg-green-700 w-[18px] h-[18px] rounded-full">
            {cartCount()}
          </button>
        </div>
        <button
          onClick={() => setOpen(!open)}
          aria-label="Menu"
          className="sm:hidden"
        >
          <svg width="21" height="15" viewBox="0 0 21 15" fill="none">
            <rect width="21" height="1.5" rx=".75" fill="#426287" />
            <rect x="8" y="6" width="13" height="1.5" rx=".75" fill="#426287" />
            <rect x="6" y="13" width="15" height="1.5" rx=".75" fill="#426287" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${
          open ? "flex animate-slideDown" : "hidden"
        } absolute top-[60px] left-4 right-4 bg-white shadow-lg rounded-xl py-4 flex-col items-start gap-4 px-6 text-base md:hidden z-50 transition-all duration-300`}
      >
        <Link onClick={() => setOpen(false)} to="/" className="hover:text-green-800 transition-colors">
          Home
        </Link>
        <Link onClick={() => setOpen(false)} to="/products" className="hover:text-green-800 transition-colors">
          Products
        </Link>

        {user ? (
          <>
            <div className="w-full h-px bg-gray-200 my-2"></div>
            <div className="w-full flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <img src={assets.profile_icon} alt="Profile" className="w-8 h-8 rounded-full" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Welcome back!</p>
                <p className="text-xs text-gray-500">{user.name || 'User'}</p>
              </div>
            </div>
            
            <button
              onClick={() => {
                setOpen(false);
                navigate("/my-orders");
              }}
              className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors text-left"
            >
              <svg className="w-5 h-5 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="font-medium">My Orders</span>
            </button>
            
            <button
              onClick={() => {
                setOpen(false);
                logout();
              }}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-green-700 hover:bg-green-800 text-white rounded-lg transition-all font-medium"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Signout
            </button>
          </>
        ) : (
          <>
            <div className="w-full h-px bg-gray-200 my-2"></div>
            <div className="w-full p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-200">
              <p className="text-sm text-green-800 font-medium mb-2">Join Trolley Today!</p>
              <p className="text-xs text-green-600 mb-3">Sign in to access your orders and save your favorites</p>
              <button
                onClick={() => {
                  setOpen(false);
                  setShowUserLogin(true);
                }}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-green-700 hover:bg-green-800 text-white rounded-lg transition-all font-medium"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m0 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                Sign In
              </button>
            </div>
          </>
        )}
      </div>

    </nav>
  );
};

export default Navbar;
