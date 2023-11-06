import mongoose from "mongoose";
const idString = Math.random().toString(32).substring(5).toLocaleUpperCase();
const idNumber = Math.floor(Math.random() * 1000);
const schimaOrder = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    userAddress: {
      type: Object,
    },
    order: [{ type: Object, required: true }],
    status: {
      type: String,
      enum: ["Pending", "Polished", "Deliverd"],
      default: "Pending",
    },
    orderId: {
      type: String,
      required: true,
      default: idString + idNumber,
    },
    totalPrice: {
      type: Number,
    },
    useOffer:{
      type:Number
    },
    deliverAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);
const Order = mongoose.model("Order", schimaOrder);
export default Order;
