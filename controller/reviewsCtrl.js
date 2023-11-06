import Reviews from "../model/Reviews.js";
import asyncHandler from "express-async-handler";

export const createReviews = asyncHandler(async (req, res) => {
  const { message, product, score, replay } = req.body;
  const { name } = req.userId;
  if (replay) {
    const data = await Reviews.create({
      message,
      user: name,
      replay,
      product,
    });
    res.status(201).send({ data, message: "نظر شما ثبت شد" });
  }
  if ((!message || !user || !product, !score)) {
    throw new Error("تمام فیلد هارو پر کنید");
  }
  const data = await Reviews.create({
    message,
    user: name,
    score,
    product,
  });
  res.status(201).send({ data, message: "نظر شما ثبت شد" });
});
export const getAllReviews = asyncHandler(async (req, res) => {
  const { isCheck } = req.query;
  const page = req.query?.page || 1;
  const limit = req.query?.page || 5;
  let data = Reviews.find()?.populate("replay", "message user");
  if (isCheck) {
    data = data.find({ isCheck: false });

  }

  const allData = await data.skip(page).limit(limit);
  res.send({ allData, count: allData.length });
});
export const getSingleReviews = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Reviews.find({ _id: id });
    if (!data.length) throw new Error();
    res.send(data);
  } catch (err) {
    throw new Error("کامنت مورد نظر یافت نشد");
  }
});
export const deleteReviwes = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Reviews.deleteOne({ _id: id });
    if (!data.deletedCount) throw new Error();
    res.send({ message: "کامنت با موفقیت حذف شد" });
  } catch (err) {
    throw new Error("خطایی پیش آمده بعدا دوباره امتحان کنید");
  }
});
export const updateReviews = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { message, isCheck, score } = req.body;
  try {
    const data = await Reviews.findOneAndUpdate(
      { _id: id },
      { message, isCheck, score },
      { new: true }
    );
    if (!data) throw new Error();
    res.send({ data });
  } catch (err) {
    throw new Error("خطایی پیش آمده لطفا دوباره تلاش کنید");
  }
});
