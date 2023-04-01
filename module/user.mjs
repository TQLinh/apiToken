import { ObjectId } from "bson";
import mongoose from "mongoose";

const tableUser = new mongoose.Schema(
  {
    // id: {
    //   type: ObjectId,
    // },
    username: {
      type: String,
      required: [true, "please provide a unique username"],
      unique: [true, "Username Exist"],
    },
    password: {
      type: String,
      required: [true, "please provide a password"],
      unique: false,
    },
    email: {
      type: String,
      required: [true, "please provide a unique email"],
      unique: true,
    },
    profile: {
      type: String,
    },
    // firstName: {
    //   type: String,
    // },
    // lastName: {
    //   type: String,
    // },
    // mobile: {
    //   type: Number,
    // },
    // address: {
    //   type: String,
    // },
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("Users", tableUser);
export default User;
