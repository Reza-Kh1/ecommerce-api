import mongoose from "mongoose";
const scheemaCoupon = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    numberUse: {
      type: Number,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    percentPrice: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);
const Coupon = mongoose.model("Coupon", scheemaCoupon);
export default Coupon;
