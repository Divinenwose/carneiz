import { Order } from "../models/orderModel.js";


// Place a new order after successful payment
export const placeOrder = async (req, res) => {
  try {
    const { items, totalAmount, transactionId, deliveryDetails } = req.body;
    const userId = req.user.id;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No items in the order" });
    }

    if (!deliveryDetails) {
      return res.status(400).json({ message: "Delivery details are required" });
    }

    if (!totalAmount || !transactionId) {
      return res.status(400).json({ message: "Total amount and transaction ID are required" });
    }

    // Process and store order with items and deliveryDetails
    const newOrder = new Order({
      user: userId,
      items,
      totalAmount,
      transactionId,
      deliveryDetails,
    });

    const savedOrder = await newOrder.save();
    console.log("Saved Order:", savedOrder);

    // Populate the product field in each item
    const populatedOrder = await Order.findById(savedOrder._id).populate("items.product");

    res.status(201).json(populatedOrder); // Return the populated order
  } catch (error) {
    res.status(500).json({ message: "Error placing order", error: error.message });
  }
};

// Verify the order details
export const verifyOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id).populate("items.product");
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Check if the user is authorized to view the order
    if (order.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "You are not authorized to view this order" });
    }

    res.status(200).json(order); // Return the order details for verification
  } catch (error) {
    res.status(500).json({ message: "Error verifying order", error: error.message });
  }
};

// Get all orders for a user (with pagination)
export const userOrders = async (req, res) => {
  try {
    const userId = req.user.id; // This assumes the user's ID is available from the token
    const { page = 1, limit = 10 } = req.query; // Paginate orders
    const orders = await Order.find({ user: userId })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .populate("items.product"); // Populate product field in items

    res.status(200).json(orders); // Return orders specific to the logged-in user
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error: error.message });
  }
};

export const listOrders = async (req,res) => {
  try {
    const orders = await Order.find({});
    res.json({success:true, data:orders})
  } catch (error) {
    console.log(error);
    res.json({success:false,message: "Error"})
  }
};

export const updateStatus = async (req,res) => {
  try {
    await Order.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
    res.json({success:true, message:"Status Updated"})
  } catch (error) {
    console.log(error);
    res.json({success:false, message:"Error"})
  }
}
