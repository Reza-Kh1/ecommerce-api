import Product from "../model/Product.js";
import asyncHandler from "express-async-handler";
export const sumProducts = asyncHandler(async (req, res) => {
  const data = await Product.aggregate([
    {
      $group: {
        _id: null,
        totalQtyProduct: {
          $sum: "$totalQty",
        },
        minimumPrice: {
          $min: "$price",
        },
        maximumPrice: {
          $max: "$price",
        },
      },
    },
  ]);
  const avgPrice = await Product.aggregate([
    {
      $group: {
        _id: null,
        avg: {
          $avg: "$price",
        },
      },
    },
  ]);
  res.send({ data, avgPrice });
});
