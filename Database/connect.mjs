import mongoose from "mongoose";
const url = "mongodb://localhost:27017/auth";
mongoose.set("strictQuery", true);
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
