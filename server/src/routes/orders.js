import express from "express";
import mongoose from "mongoose";
import { verifyToken } from "./user.js";
import * as db from './../db/index.js';

const router = express.Router();

//GET che ignora controlli
router.get("/", async (req, res) => {
  console.log("API request:: /orders/")
  try {
    const result = await db.query('SELECT * FROM orders;')
    console.log(result)
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json(err);
    console.error(err)
  }
});

//TODO
//GET ordini - customer
// SELECT * FROM orders WHERE orders.CUST_CODE = x;
//GET ordini - agents
// SELECT * FROM orders WHERE orders.AGENT_CODE = x;


export { router as ordersRouter };
