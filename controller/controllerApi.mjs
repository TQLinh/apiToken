import User from "../module/user.mjs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import otpGenerator from "otp-generator";
const handleApi = {
  register: async (req, res) => {
    const { username, email, password, profile } = req.body;
    try {
      const checkUsername = await User.findOne({
        username,
      });

      const checkEmail = await User.findOne({ email });

      if (!checkEmail && !checkUsername) {
        bcrypt
          .hash(password, 10)
          .then((hashPassword) => {
            const user = new User({
              password: hashPassword,
              username,
              email,
              profile,
            });
            user
              .save()
              .then(() => {
                return res
                  .status(201)
                  .json({ message: "User register successtfy" });
              })
              .catch((err) => {
                return res.status(500).send(err);
              });
          })
          .catch((err) => {
            return res.status(500).send(err);
          });
      }
    } catch (error) {
      console.log("error: ", error);
      return res.status(500).send(error);
    }
  },
  login: async (req, res) => {
    const { username, password } = req.body;
    try {
      User.findOne({ username })
        .then((user) => {
          bcrypt
            .compare(password, user.password)
            .then((checkPw) => {
              if (!checkPw)
                return res.status(404).send({ err: "Do not have password" });

              const token = jwt.sign(
                { userId: user._id, username: user.username },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "1h" }
              );

              return res.status(200).send({
                msg: "Login Successful...!",
                username: user.username,
                token,
              });
            })
            .catch((err) => {
              return res.status(500).send("Password does not match");
            });
          return;
        })
        .catch((err) => {
          return res.status(500).send(err);
        });
    } catch (error) {
      console.log("error: ", error);
      return res.status(500).send(error);
    }
  },
  getUser: async (req, res) => {
    const { username } = req.params;
    try {
      if (!username)
        return await res.status(404).send({ err: "Invalid username" });
      const user = await User.findOne({ username });
      if (!user) return res.status(404).send({ err: "could not find user " });
      const { password, ...rest } = Object.assign({}, user.toJSON());
      return await res.status(201).json(rest);
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  updateUser: async (req, res) => {
    const { userId } = req.user;
    console.log("req.user: ", req.user);
    try {
      // if (!id) return res.status(400).send({ err: "user id not fond" });
      if (userId) {
        console.log("userId: ", userId);
        const newData = req.body;
        console.log("newData: ", newData);
        await User.updateOne({ _id: userId }, newData);
        return await res.status(201).send({ msg: "Record Updated...!" });
      }
    } catch (error) {
      return res.status(404).send({ err: error });
    }
  },
  generateOtp: async (req, res) => {
    try {
      req.app.locals.OTP = await otpGenerator.generate(6, {
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false,
      });
      return await res.status(200).send({ code: req.app.locals.OTP });
    } catch (error) {
      return res.status(404).send({ err: error });
    }
  },
  vetifyOtp: async (req, res) => {
    const { code } = req.query;
    try {
      if (parseInt(req.app.locals.OTP) === parseInt(code)) {
        req.app.locals.OTP = null; // reset the OTP value
        req.app.locals.resetSession = true; // start session for reset password
        return res.status(201).send({ msg: "Verify Successsfully!" });
      }
    } catch (error) {
      return res.status(404).send({ err: error });
    }
  },
  createResetSession: async (req, res) => {
    res.json("hello");
  },
  resetPassword: async (req, res) => {
    res.json("hello");
  },
};

export default handleApi;
