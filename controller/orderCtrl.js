import Order from "../model/Order.js";
import asyncHandler from "express-async-handler";

export const getAllOrder = asyncHandler(async (req, res) => {
  const data = await Order.find();
  res.send({ data, total: data.length });
});
export const getSingleOrder = asyncHandler(async (req, res) => {
  try {
    const data = await Order.findOne({ userId: req.userId.id });
    if (!data) throw new Error();
    res.send({ data });
  } catch (err) {
    throw new Error("سبد خرید شما خالی است");
  }
});
export const createOrder = asyncHandler(async (req, res) => {
  const { order } = req.body;
  const { id } = req.userId;
  let totalPrice = 0;
  if (!order) throw new Error("محصولی را به سبد خرید اضافه کنید");
  const chekUser = await Order.findOne({ userId: id });
  if (chekUser) {
    let test = chekUser.order;
    const mapOrder = test.some((i) => {
      if (i._id === order._id) {
        i.totalQty += order.totalQty;
        return true;
      }
    });
    test.forEach((i) => {
      i.totalQty += order.totalQty;
      totalPrice = totalPrice + i.price * i.totalQty;
    });
    if (!mapOrder) {
      test.push(order);
    }
    const gog = await Order.findOneAndUpdate(
      { userId: id },
      { order: test, totalPrice },
      { new: true }
    );
    res.send({ gog });
    return;
  }
  const data = await Order.create({
    userId: id,
    totalPrice: order.totalQty * order.price,
  });
  res.send({ data });
});
export const deleteOrder = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Order.findOneAndDelete({ _id: id });
    if (!data) throw new Error();
    res.send({ data, message: "محصول مورد نظر با موفقیت حذف شد" });
  } catch (err) {
    throw new Error("سبد خرید شما خالی است");
  }
});
export const updateOrder = asyncHandler(async (req, res) => {
  const { id } = req.params;
  let data = await Order.findOne({ userId: req.userId.id });
  const update = data.order.filter((i) => {
    if (i._id !== id) {
      return i;
    }
  });

  await data.updateOne({ order: update });
  res.send({ message: "بروز شد" });
});
