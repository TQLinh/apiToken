import jwt from "jsonwebtoken";
import User from "../module/user.mjs";
const vetifyToken = async (req, res, next) => {
  try {
    const { username } = req.method == "GET" ? req.query : req.body;

    // check the user existance
    let exist = await User.findOne({ username });
    if (!exist) return res.status(404).send({ error: "Can't find User!" });
    next();
  } catch (error) {
    return res.status(404).send({ error: "Authentication Error" });
  }
};

const auth = async (req, res, next) => {
  // req.header("Authorization");
  try {
    const token = await req.header("Authorization").split(" ")[1];
    console.log("token: ", token);
    // if (!token) {
    //   return res.status(401).send({ message: "No token" });
    // }
    const deCodeToken = await jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET
    );
    console.log("deCodeToken: ", deCodeToken);
    req.user = deCodeToken;
    next();
  } catch (error) {
    return res.status(404).send({ error: "Authentication Error" });
  }
};
const localVariables = async (req, res, next) => {
  req.app.locals = { OTP: null, resetSession: false };
  next();
};
export { auth, localVariables };
export default vetifyToken;
