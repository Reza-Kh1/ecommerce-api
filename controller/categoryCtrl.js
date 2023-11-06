import asyncHandler from "express-async-handler";
import Category from "../model/Category.js";
import Product from "../model/Product.js";

export const createCategoryCtrl = asyncHandler(async (req, res) => {
  const { name } = req.body;
  if (!name) throw new Error("نام دسته را وارد کنید");
  const finder = await Category.findOne({ name: name });
  if (finder) throw new Error("این دسته بندی وجود دارد");
  const data = await Category.create(req.body);
  res.status(201).send({ data });
});
export const getCategoryCtrl = asyncHandler(async (req, res) => {
  const data = await Category.find();
  res.send({ data });
});
export const updateCategoryCtrl = asyncHandler(async (req, res) => {
  const { name, productId } = req.body;
  if (!name || !productId) throw new Error("نام دسته و محصو را وارد کنید");
  try {
    const finfProduct = await Product.findOne({ _id: productId });
    if (!finfProduct) throw new Error("محصول مورد نظر یافت نشد");
  } catch (err) {
    throw new Error("محصول مورد نظر یافت نشد");
  }
  const data = await Category.findOne({ name });
  if (!data) throw new Error("خطایی ایجاد شده بعدا دوباره امتحان کنید");
  if (data.productId) {
    const checkCategory = await Category.findOne({ name, productId });
    if (checkCategory)
      throw new Error("این محصول در این دسته از قبل قرار داشته است");
  }
  data.productId.push(productId);
  data.save();
  res.send({ massage: "محصول مورد نظر به دسته بندی اضافه شد" });
});
export const deleteCategoryCtrl = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) throw new Error("هیچ دسته ای برای حذف انتخاب نشده است");
  const data = await Category.findByIdAndDelete({ _id: id });
  if (!data) throw new Error("دسته مورد نظر یافت نشد");
  res.send({ massage: "محصول مورد نظر حذف شد" });
});
