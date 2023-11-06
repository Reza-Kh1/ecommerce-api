import mongoose from "mongoose";
const dbConnect = async () => {
  try {
    const mongo = mongoose.connect(process.env.MONGO_URL);
    mongoose.set("strictQuery",true)
    console.log("Mongo Db connected");
  } catch (err) {
    console.log(err);
  }
};
export default dbConnect;
//mongodb+srv://portfolio:<password>@nodejs-ecommerce-api.hsrz7ir.mongodb.net/?retryWrites=true&w=majority
//D1wrXYEwqWxejbQw

