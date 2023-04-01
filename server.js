import express from "express";
import "./Database/connect.mjs";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import { routerApi } from "./Router/route.mjs";
const app = express();
dotenv.config();
const router = express.Router();

//middleware
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
app.disable("x-powered-y");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routerApi(app);
app.get("/", function (req, res) {
  return res.status(200).send({ mes: "hi" });
});
//port
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server running host http:localhost:${port}`);
});
