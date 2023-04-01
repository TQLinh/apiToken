import { Router } from "express";
import handleApi from "../controller/controllerApi.mjs";
import vetifyToken, { auth, localVariables } from "../middleware/auth.mjs";
const router = Router();
const routerApi = (app) => {
  //Method POST
  router.post("/register", handleApi.register);
  // router.post("/registerEmail"); // resgiter the email
  router.post("/authenticate", (req, res) => {
    res.end();
  });
  router.post("/login", vetifyToken, handleApi.login);
  //Method GET
  router.get("/user/:username", handleApi.getUser);
  router.get(
    "/generateOtp",
    vetifyToken,
    localVariables,
    handleApi.generateOtp
  );
  router.get("/vetifyOtp", vetifyToken, handleApi.vetifyOtp);
  router.get("/createResetSession", handleApi.createResetSession);
  //Method PUT
  router.put("/updateUser", auth, handleApi.updateUser);
  //Method DELETE
  return app.use("/api/auth", router);
};
export { routerApi };
