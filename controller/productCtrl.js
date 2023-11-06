import Product from "../model/Product.js";
import asyncHandler from "express-async-handler";

export const createProductCtrl = asyncHandler(async (req, res) => {
  // console.log(req.file);
  const { name, description, brand, category, sizes, colors, price, totalQty } =
    req.body;
  if (
    !name ||
    !description ||
    !brand ||
    !category ||
    !sizes ||
    !colors ||
    !price ||
    !totalQty
  )
    throw new Error("لطفا مقادیر لازم را پرکنید");
  const product = await Product.create({
    name,
    user: req.userId.id,
    description,
    brand,
    category,
    sizes,
    colors,
    price,
    totalQty,
  });
  res.send({ product });
});
export const getProductCtrl = asyncHandler(async (req, res) => {
  let data = Product.find();
  const pagination = {};
  let total = 0;
  const limit = 2;
  const page = parseInt(req.query.page) || 1;
  const skipPage = (page - 1) * limit;
  const reqForAll = Object.keys(req.query).map((i) => {
    return i === "page";
  });
  if (
    !Object.keys(req.query).length ||
    (Object.keys(req.query).length === 1 && reqForAll[0])
  ) {
    total = await Product.countDocuments();
  }
  if (req.query.name) {
    data = data.find({
      name: { $regex: req.query.name, $options: "i" },
    });
  }
  if (req.query.colors) {
    data = data.find({
      colors: { $regex: req.query.colors, $options: "i" },
    });
  }
  if (req.query.sizes) {
    data = data.find({
      sizes: { $regex: req.query.sizes, $options: "i" },
    });
  }
  if (req.query.category) {
    data = data.find({
      category: { $regex: req.query.category, $options: "i" },
    });
  }
  if (req.query.brand) {
    data = data.find({
      brand: { $regex: req.query.brand, $options: "i" },
    });
  }
  if (req.query.price) {
    const priceProduct = req.query.price.split("-");
    data = data.find({
      price: { $gte: priceProduct[0], $lte: priceProduct[1] },
    });
  }
  if (page - 1 > 0) {
    pagination.prev = page - 1;
  }
  // data = data.skip(skipPage).limit(limit);
  // const count = await data.count();
  data = data.skip(skipPage).limit(limit).populate("category", "name");
  const products = await data;
  if (!total) {
    total = products.length;
  }
  if (Number(page) !== Number(Math.round(total / limit))) {
    pagination.next = page + 1;
  }
  res.send({
    products,
    total,
    page,
    pages: Math.round(total / limit),
    pagination,
  });
});
export const getSinglePageCtrl = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Product.findById({ _id: id }).populate(
      "category",
      "name"
    );
    if (!data) throw new Error();
    res.status(200).json(data);
  } catch (err) {
    throw new Error("محصول مور نظر یافت نشد!");
  }
});
export const deleteProductCtrl = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Product.findOneAndDelete({ _id: id });
    if (!data) throw new Error();
    res.send({ massage: "محصول با موفقیت حذف شد" });
  } catch (err) {
    throw new Error("مشکلی پیش آمده محصول مورد نظر حذف نشد");
  }
});
export const updateProductCtrl = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  try {
    const data = await Product.findOneAndUpdate(
      { _id: id },
      { ...body },
      { new: true }
    );
    if (!data) throw new Error();
    res.send(data);
  } catch (err) {
    throw new Error("محصول یافت نشد");
  }
});
