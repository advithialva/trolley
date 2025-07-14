import { Link, NavLink, Outlet } from "react-router-dom";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
const SellerLayout = () => {
  const { isSeller, setIsSeller, axios, navigate } = useAppContext();
  const sidebarLinks = [
    { name: "Add Product", path: "/seller", icon: assets.add_icon },
    {
      name: "Product List",
      path: "/seller/product-list",
      icon: assets.product_list_icon,
    },
    { name: "Orders", path: "/seller/orders", icon: assets.order_icon },
  ];

  const logout = async () => {
    try {
      const { data } = await axios.get("/api/seller/logout");
      if (data.success) {
        setIsSeller(false);
        toast.success("Logged out successfully");
        navigate("/");
      }
    } catch (error) {
      toast.error("Failed to logout");
      console.error(error);
    }
  };
  return (
    <>
      <nav className="fixed top-0 left-0 right-0 flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white transition-all z-50">
        <Link to={"/"}>
          <h2 className="text-2xl font-bold text-green-700">Trolley</h2>
        </Link>
        
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <span className="hidden sm:inline text-gray-700 font-medium">Seller Dashboard</span>
          </div>
          
          <button
            onClick={logout}
            className="flex items-center gap-2 px-6 py-2 bg-green-700 hover:bg-green-800 transition text-white rounded-full font-medium"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </nav>
      
      <div className="flex pt-20">
        <div className="md:w-64 w-16 border-r h-[calc(100vh-80px)] text-base border-gray-200 shadow-sm flex flex-col bg-white">
          {/* Navigation Links */}
          <nav className="flex-1 px-3 py-6 space-y-1">
            {sidebarLinks.map((item) => (
              <NavLink
                to={item.path}
                key={item.name}
                end={item.path === "/seller"}
                className={({ isActive }) => `
                  group flex items-center px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 relative
                  ${isActive 
                    ? "bg-green-50 text-green-700 shadow-sm" 
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }
                `}
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-green-600 rounded-r-full"></div>
                    )}
                    <div className={`
                      flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200
                      ${isActive 
                        ? "bg-green-100" 
                        : "bg-gray-100 group-hover:bg-gray-200"
                      }
                    `}>
                      <img 
                        src={item.icon} 
                        alt={item.name} 
                        className="w-5 h-5 transition-all duration-200"
                      />
                    </div>
                    <span className="md:block hidden ml-3 truncate">{item.name}</span>
                    
                    {/* Tooltip for mobile */}
                    <div className="md:hidden absolute left-16 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                      {item.name}
                      <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900"></div>
                    </div>
                  </>
                )}
              </NavLink>
            ))}
          </nav>
        </div>
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </>
  );
};
export default SellerLayout;
