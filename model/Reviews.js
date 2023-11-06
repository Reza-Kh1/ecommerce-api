import mongoose from "mongoose";
const schimaReviews = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
    replay: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Reviews",
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    score: {
      type: Number,
      min: 1,
      max: 5,
    },
    isCheck: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
const Reviews = mongoose.model("Reviews", schimaReviews);
export default Reviews;
