import jwt from "jsonwebtoken";
const getToken = (req, res, next) => {
  const token = req.headers?.authorization?.split(" ")[1];
  if (token === undefined) throw new Error("توکن وجود ندارد");
  try {
    const verify = jwt.verify(token, process.env.JWT_KEY);
    req.userId = verify.data
    next();
  } catch (err) {
    throw new Error("توکن منقضی شده است");
  }
};
export default getToken;
