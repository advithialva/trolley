import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { toast } from "react-hot-toast";
const Auth = () => {
  const [state, setState] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setShowUserLogin, setUser, axios, navigate } = useAppContext();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const { data } = await axios.post(`/api/user/${state}`, {
        name,
        email,
        password,
      });
      if (data.success) {
        toast.success(data.message);
        navigate("/");
        setUser(data.user);
        setShowUserLogin(false);
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
    <div
      onClick={() => setShowUserLogin(false)}
      className="fixed top-0 left-0 bottom-0 right-0 z-30 flex items-center justify-center bg-black/60 backdrop-blur-sm text-gray-600 p-4"
    >
      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col gap-4 m-auto items-start p-6 py-8 w-full max-w-sm rounded-xl shadow-2xl border border-gray-200 bg-white relative overflow-hidden"
      >
        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-green-500 to-green-700"></div>
        
        {/* Header */}
        <div className="w-full text-center mb-1">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">
            Welcome to <span className="text-green-700">Trolley</span>
          </h2>
          <p className="text-gray-500 mt-1 text-sm">
            {state === "login" ? "Sign in to your account" : "Create your account"}
          </p>
        </div>

        {/* Form Fields */}
        {state === "register" && (
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <div className="relative">
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                placeholder="Enter your full name"
                className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors bg-gray-50 focus:bg-white"
                type="text"
                required
              />
            </div>
          </div>
        )}

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
          {state === "register" ? "Create Account" : "Sign In"}
        </button>

        {/* Toggle State */}
        <div className="w-full text-center">
          {state === "register" ? (
            <p className="text-gray-600 text-sm">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => setState("login")}
                className="text-green-700 hover:text-green-800 font-medium hover:underline transition-colors"
              >
                Sign in here
              </button>
            </p>
          ) : (
            <p className="text-gray-600 text-sm">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => setState("register")}
                className="text-green-700 hover:text-green-800 font-medium hover:underline transition-colors"
              >
                Create one here
              </button>
            </p>
          )}
        </div>

        {/* Close button */}
        <button
          type="button"
          onClick={() => setShowUserLogin(false)}
          className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
        >
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </form>
    </div>
  );
};
export default Auth;
