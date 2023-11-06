import mongoose from "mongoose";
const categoryModel = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    Unique: true,
  },
  productId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  ],
});

const Category = mongoose.model("Category", categoryModel);
export default Category;
