import express from "express";
import mongoose from "mongoose";
import { verifyToken } from "./user.js";
import db from './../db/index.js';

const router = express.Router();

//GET che ignora controlli
router.get("/", async (req, res) => {
  console.log("API request:: /orders/")
  try {
    const result = await db.queryAgents('SELECT * FROM "ORDERS";')
    //console.log(result)
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json(err);
    console.error(err)
  }
});

//TODO
//GET ordini - customer
// SELECT * FROM orders WHERE orders.CUST_CODE = x;
// Stefano
router.get("/customers/:c_code", async (req, res) => {
    //const { custCode } = req.params;
    const custCode = req.params.c_code;
    console.log("prendo ordini di ", custCode)
    const orders = await db.queryAgents('SELECT * FROM "ORDERS" WHERE "CUST_CODE" = $1', [custCode]);
    try {
        console.log('Orders: ', orders.rows)
        res.status(200).json(orders.rows)
    } catch (err) {
        res.status(500).json(err)
        console.error(err)
    }
})

//GET ordini - agents
// SELECT * FROM orders WHERE orders.AGENT_CODE = x;
// Stefano
router.get("/agents/:a_code", async (req, res) => {
    const agentCode = req.params.a_code;
    console.log("prendo gli ordini di agente ", agentCode);
    const orders = await db.queryAgents('SELECT * FROM "ORDERS" WHERE "AGENT_CODE" = $1', [agentCode]);
    try {
        console.log('Orders: ', orders.row)
        res.status(200).json(orders.rows)
    } catch (err) {
        res.status(500).json(err)
        console.error(err)
    }
})


export { router as ordersRouter };
