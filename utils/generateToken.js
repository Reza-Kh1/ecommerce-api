import jwt from "jsonwebtoken";
const generateToken = (data) => {
  const token = jwt.sign({ data }, process.env.JWT_KEY, { expiresIn: "10d" });
  return token;
};
export default generateToken;
