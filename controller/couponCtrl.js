import Coupon from "../model/Coupon.js";
import asyncHandler from "express-async-handler";
import Order from "../model/Order.js";
export const getAllCoupon = asyncHandler(async (req, res) => {
  const data = await Coupon.find();
  res.send({ data });
});

export const createCoupon = asyncHandler(async (req, res) => {
  const { code, numberUse, endDate, startDate, percentPrice } = req.body;
  const { id } = req.userId;
  const chekCoupon = await Coupon.findOne({ code });
  if (chekCoupon) throw new Error("این کد تخفیف از قبل وجود دارد");
  let timeNow;
  if (!code || !numberUse || !endDate || !percentPrice)
    throw new Error("تمامیه فیلد های لازم رو پر کنید");
  if (!startDate) {
    timeNow = new Date();
  }
  const futureDate = new Date(
    timeNow.getTime() + endDate * 24 * 60 * 60 * 1000
  );
  const data = await Coupon.create({
    user: id,
    code,
    numberUse,
    endDate: futureDate,
    startDate: timeNow,
    percentPrice,
  });

  res.send({ data });
});

export const getSingleCoupon = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const data = await Coupon.findById(id);
  if (!data) throw new Error("کد تخفیفی که وارد کرده اید وجود ندارد");
  res.send({ data });
});

export const DeleteCoupon = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Coupon.deleteOne({ _id: id });
    if (!data.deletedCount) throw new Error();
    res.send({ message: "حذف با موفقیت انجام شد" });
  } catch (err) {
    throw new Error("حذف کوپن با خطا روبرو شد لطفا بعدا دوباره تلاش کنید");
  }
});

export const updateCuoupon = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  if (body?.endDate) {
    const timeNow = new Date();
    const futureDate = new Date(
      timeNow.getTime() + body.endDate * 24 * 60 * 60 * 1000
    );
    body.endDate = futureDate;
  }
  try {
    const data = await Coupon.updateOne({ _id: id }, body, { new: true });
    if (!data.modifiedCount) throw new Error();
    res.send({ message: "عملیات آپدیت با موفقیت انجام شد" });
  } catch (err) {
    throw new Error(
      "عملیات آپدیت با خطا روبه رو شد لطفا بعدا دوباره تلاش کنید"
    );
  }
});

export const useCoupon = asyncHandler(async (req, res) => {
  const { idProduct } = req.body;
  const { id } = req.params;
  const isCoupon = await Coupon.findOne({ code: id });
  if (!isCoupon || !isCoupon?.numberUse)
    throw new Error("این کد تخفیف منقضی شده است");
  const orderUser = await Order.findById(idProduct);
  if (!orderUser.useOffer) {
    orderUser.totalPrice = orderUser.totalPrice - isCoupon.percentPrice;
    orderUser.useOffer = isCoupon.percentPrice;
    orderUser.save();
    isCoupon.numberUse = isCoupon.numberUse - 1;
    isCoupon.save();
    res.send({ orderUser });
  }
  res.send({ message: "شما از کد تخفیف استفاده کردید" });
});
