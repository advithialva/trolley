import Order from "../models/order.model.js";
import Product from "../models/product.model.js";

// Place order COD: /api/order/place
export const placeOrderCOD = async (req, res) => {
  try {
    const userId = req.user;
    const { items, address } = req.body;

    if (!address || !items || items.length === 0) {
      return res.status(400).json({ message: "Invalid order details", success: false });
    }

    // Calculate total amount
    let amount = 0;
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(400).json({ message: "Invalid product", success: false });
      }
      amount += product.offerPrice * item.quantity;
    }

    amount += Math.floor((amount * 2) / 100); // Add tax

    const newOrder = await Order.create({
      userId,
      items,
      address,
      amount,
      paymentType: "COD",
      isPaid: false,
    });

    res.status(201).json({ message: "Order placed successfully", success: true });
  } catch (error) {
    console.error("Error placing COD order:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


// order details for individual user :/api/order/user
export const getUserOrders = async (req, res) => {
  try {
    const userId = req.user;
    const orders = await Order.find({
      userId,
      $or: [{ paymentType: "COD" }, { isPaid: true }],
    })
      .populate("items.product address")
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// get all orders for admin :/api/order/all
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      $or: [{ paymentType: "COD" }, { isPaid: true }],
    })
      .populate("items.product address")
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update payment status for COD orders: /api/order/update-payment/:orderId
export const updatePaymentStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { isPaid } = req.body;

    if (!orderId) {
      return res.status(400).json({ message: "Order ID is required", success: false });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found", success: false });
    }

    // Only allow updating COD orders
    if (order.paymentType !== "COD") {
      return res.status(400).json({ message: "Can only update COD orders", success: false });
    }

    // Update payment status
    order.isPaid = isPaid;
    await order.save();

    res.status(200).json({ 
      message: "Payment status updated successfully", 
      success: true,
      order: {
        _id: order._id,
        isPaid: order.isPaid
      }
    });
  } catch (error) {
    console.error("Error updating payment status:", error);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};
