import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { cloudinary, mongoConnection } from "./connection.js";
import {
  DBSTATUSAPI,
  HEALTHCHECKAPI,
  routesConstants,
} from "../constants/routes.constants.js";
import userRouter from "./routes/userRoute.js";
import adminRouter from "./routes/adminRoute.js";
import doctorRouter from "./routes/doctorRoute.js";

const { USERROUTES, ADMINROUTES, DOCTORROUTES } = routesConstants;

mongoConnection();
cloudinary;

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const routes = [
  { path: USERROUTES, router: userRouter },
  { path: ADMINROUTES, router: adminRouter },
  { path: DOCTORROUTES, router: doctorRouter },
];

routes.forEach(({ path, router }) => {
  app.use(path, router);
});

app.get(HEALTHCHECKAPI, (req, res) => {
  res.status(200).json({ message: "API is working fine" });
});

app.use(DBSTATUSAPI, async (req, res) => {
  try {
    await mongoConnection();
    res.status(200).json({ message: "DB is working fine" });
  } catch (error) {
    res.status(500).json({ message: "DB is not working fine" });
  }
});

app.use((error, req, res, next) => {
  res.status(error.statusCode || 500).json(error || "Something went wrong");
});

export default app;
