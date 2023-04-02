import mongoose from "mongoose";
const url =
  "mongodb+srv://shop_milk:IdQyQ5C6ZR6dLb5D@shopmilk.bi52laq.mongodb.net/?retryWrites=true&w=majority";
//localhost:27017/auth
// mongodb+srv://shop_milk:IdQyQ5C6ZR6dLb5D@shopmilk.bi52laq.mongodb.net/?retryWrites=true&w=majority
mongodb: mongoose.set("strictQuery", true);
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connect successfly");
  })
  .catch((err) => {
    console.log("err: ", err);
  });
