import express from "express";
import cors from "cors";
import bodyParser from 'body-parser';

import { userRouter } from "./routes/user.js";

import dotenv from "dotenv"
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use("/api/v1/auth", userRouter);



async function startServer() {
  try {

    /* --- Server Starting --- */
    app.listen(process.env.PORT || 4000, () => console.log("Server started"));
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
}

await startServer();










