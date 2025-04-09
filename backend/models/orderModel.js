import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "product", required: true },
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
  deliveryDetails: {
    firstName: { type: String, required: true }, // Ensure first name is required
    lastName: { type: String, required: true },  // Ensure last name is required
    email: { 
      type: String, 
      required: true, 
      match: [/\S+@\S+\.\S+/, "Please provide a valid email address"], // Email format validation
    },
    street: { type: String, required: true },  // Street address required
    city: { type: String, required: true },    // City required
    state: { type: String, required: true },   // State required
    country: { type: String, required: true }, // Country required
    phone: { 
      type: String, 
      required: true, 
      match: [/^\d{11}$/, "Phone number should be 11 digits"] // Phone number validation (Nigerian format)
    },
  },
  totalAmount: { type: Number, required: true },
  status: { type: String, enum: ["Processing", "Out for delivery", "Delivered"], default: "Processing" },
  transactionId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Order = mongoose.model("Order", orderSchema);
