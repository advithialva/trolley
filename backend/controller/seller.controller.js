import jwt from "jsonwebtoken";
// seller login :/api/seller/login
export const sellerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      password === process.env.SELLER_PASSWORD &&
      email === process.env.SELLER_EMAIL
    ) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      
      // Cookie settings for production and development
      const isProduction = process.env.NODE_ENV === 'production';
      
      res.cookie("sellerToken", token, {
        httpOnly: true,
        secure: isProduction, // HTTPS in production, HTTP in development
        sameSite: isProduction ? "none" : "lax", // "none" for cross-site in production
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        domain: isProduction ? undefined : undefined, // Let browser handle domain
      });
      return res
        .status(200)
        .json({ message: "Login successful", success: true });
    } else {
      return res
        .status(400)
        .json({ message: "Invalid credentials", success: false });
    }
  } catch (error) {
    console.error("Error in sellerLogin:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// check seller auth  : /api/seller/is-auth
export const checkAuth = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.error("Error in checkAuth:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
// logout seller: /api/seller/logout
export const sellerLogout = async (req, res) => {
  try {
    res.clearCookie("sellerToken", {
      httpOnly: true,
      secure: false, // Set to false in development for localhost
      sameSite: "lax", // More permissive for CORS in development
    });
    return res.status(200).json({
      message: "Logged out successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error in logout:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
