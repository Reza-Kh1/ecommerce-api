import User from "../model/User.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

export const userRegisterCtrl = asyncHandler(async (req, res) => {
  const { fullName, email, password } = req.body;
  const checkUser = await User.findOne({ email });

  if (checkUser) {
    throw new Error("user is not valid");
  }
  if (!fullName || !email || !password) {
    throw new Error("empty valid");
  }
  const salt = await bcrypt.genSalt(10);
  const hashPass = await bcrypt.hash(password, salt);
  const users = await User.create({ fullName, email, password: hashPass });

  res.status(201).send({
    users,
    massage: "کاربر ساخته شد",
    token: generateToken({ fullName, email }),
  });
});

export const userLoginCtrl = asyncHandler(async (req, res) => {
  const { password, email } = req.body;
  if (!password || !email) {
    throw new Error("empty valid");
  }
  const user = await User.findOne({ email });
  if (!user) throw new Error("user is not valid");
  const checkPass = await bcrypt.compare(password, user.password);
  if (!checkPass) throw new Error("pass is not valid");
  res.json({
    user,
    message: "welcome !",
    userInfo: req.userId,
    token: generateToken({ id: user.id, email, name: user.fullName })
  });
});
