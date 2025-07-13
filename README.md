# 🛒 Trolley – Online Grocery Delivery App Using MERN Stack

**Trolley** is a modern e-commerce platform that allows customers to browse groceries, add items to cart, and place orders, while providing sellers with a comprehensive dashboard to manage products and orders.

This is a **full-stack online grocery delivery application** built with the **MERN stack** (MongoDB, Express.js, React.js, Node.js).  

---

## 💡 Features

### 🛍️ Customer Features
- 🏠 Browse products by categories (Vegetables, Fruits, Dairy, Beverages, etc.)
- 🔍 Search and filter products  
- 🛒 Add/remove items from shopping cart  
- 📱 Responsive mobile-first design  
- 👤 User authentication with JWT  
- 📍 Add and manage delivery addresses  
- 📦 View order history  
- 💳 Place orders with address selection  

### 🏪 Seller Features
- 📊 Seller dashboard  
- ➕ Add new products with multiple images  
- 📝 Update and delete existing products  
- 🖼️ Image upload with Cloudinary integration  
- 📋 View and manage incoming orders  
- 📈 Track order status and sales  

---

## 🛠️ Tech Stack

- **Frontend:** React.js, Vite, Tailwind CSS, React Router DOM  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB Atlas  
- **Authentication:** JWT with httpOnly cookies  
- **Image Storage:** Cloudinary  
- **State Management:** React Context API  
- **UI Components:** React Hot Toast for notifications  

---

## 📁 Project Structure
```
grocery-app/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── assets/
│   │   ├── utils/
│   │   └── ...
│   ├── package.json
│   └── vite.config.js
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   ├── uploads/
│   ├── index.js
│   └── package.json
└── README.md
```

---

## ⚙️ How to Run This Project Locally

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account
- Cloudinary account

### 1. Clone the Repository
```bash
git clone https://github.com/advithialva/trolley.git
cd trolley
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create `.env` file in backend directory:
```env
MONGO_DB=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
PORT=4000
FRONTEND_URL=http://localhost:5173
```

Start the backend server:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install
```

Create `.env` file in frontend directory:
```env
VITE_BACKEND_URL=http://localhost:4000
```

Start the frontend development server:
```bash
npm run dev
```

### 4. Access the Application
- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:4000

---

## 🎯 API Endpoints

### Authentication
- `POST /api/user/register` - User registration
- `POST /api/user/login` - User login
- `GET /api/user/logout` - User logout
- `POST /api/seller/register` - Seller registration
- `POST /api/seller/login` - Seller login

### Products
- `GET /api/product/list` - Get all products
- `GET /api/product/id` - Get single product by ID
- `POST /api/product/add-product` - Add new product (seller)
- `POST /api/product/stock` - Update product stock status (seller)
- `DELETE /api/product/delete/:id` - Delete product (seller)

### Cart & Orders
- `POST /api/cart/add` - Add item to cart
- `POST /api/cart/remove` - Remove item from cart
- `GET /api/cart/get` - Get user cart
- `POST /api/order/place` - Place order
- `GET /api/order/user-orders` - Get user orders
- `GET /api/order/seller-orders` - Get seller orders

### Address Management
- `POST /api/address/add` - Add delivery address
- `GET /api/address/get` - Get user addresses

---

## 🚀 Future Enhancements

- 💳 **Payment Integration:** Stripe/PayPal payment gateway  
- 📱 **Mobile App:** React Native version for iOS/Android  
- 🔍 **Advanced Search:** Elasticsearch integration for better search  
- 📊 **Analytics Dashboard:** Detailed sales and user analytics  
- 🚚 **Real-time Tracking:** Live order tracking with maps  
- 💬 **Customer Support:** Live chat functionality  
- 🔔 **Push Notifications:** Order updates and promotions  
- 🌐 **Multi-language:** Internationalization support  
- 🏷️ **Coupon System:** Discount codes and promotional offers  
- ⭐ **Reviews & Ratings:** Product review system  

