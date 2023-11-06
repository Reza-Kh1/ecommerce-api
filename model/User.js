import mongoose, { Schema } from "mongoose";
const user = mongoose.Schema;
const userSchima = new user(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    order: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
    wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "WishList",
      },
    ],
    isAdmin: {
      type: Boolean,
      default: false,
    },
    hasShippingAddress: {
      type: Boolean,
      default: false,
    },
    shippingAddress: {
      firstName: {
        type: String,
      },
      lasttName: {
        type: String,
      },
      address: {
        type: String,
      },
      city: {
        type: String,
      },
      postCode: {
        type: String,
      },
      province: {
        type: String,
      },
      country: {
        type: String,
      },
      phone: {
        type: Number,
      },
    },
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("User", userSchima);

export default User;
