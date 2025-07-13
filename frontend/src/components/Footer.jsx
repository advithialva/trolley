const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-green-800 to-green-900 text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 xl:px-32 py-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          {/* Brand Section */}
          <div className="space-y-3">
            <h2 className="text-xl font-bold text-white">Trolley</h2>
            <p className="text-green-100 text-sm">
              Fresh groceries and daily essentials delivered to your doorstep.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-green-100 hover:text-white transition-colors text-sm">Home</a></li>
              <li><a href="/products" className="text-green-100 hover:text-white transition-colors text-sm">Products</a></li>
              <li><a href="/cart" className="text-green-100 hover:text-white transition-colors text-sm">Cart</a></li>
              <li><a href="/my-orders" className="text-green-100 hover:text-white transition-colors text-sm">My Orders</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white">Contact</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-green-100 text-sm">hello@trolley.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-green-100 text-sm">+1 (555) 123-4567</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-green-700 pt-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <p className="text-green-100 text-sm">
              © {new Date().getFullYear()} Trolley. All rights reserved.
            </p>
            
            {/* Trust Indicators */}
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-1">
                <svg className="w-4 h-4 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span className="text-green-200 text-xs">Secure</span>
              </div>
              <div className="flex items-center space-x-1">
                <svg className="w-4 h-4 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                <span className="text-green-200 text-xs">Fast Delivery</span>
              </div>
              <div className="flex items-center space-x-1">
                <svg className="w-4 h-4 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span className="text-green-200 text-xs">Fresh</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
