import express from "express";
import mongoose from "mongoose";
import { verifyToken, authorizeRoles } from "./user.js";
import db from './../db/index.js';
import jwt from "jsonwebtoken";

const router = express.Router();

/*GET che ignora controlli
router.get("/", async (req, res) => {
  console.log("API request:: /orders/")
  try {
    const result = await db.queryAgents('SELECT * FROM ORDERS;')
    //console.log(result)
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json(err);
    console.error(err)
  }
});*/

//TODO
//GET ordini - customer
// SELECT * FROM "ORDERS" WHERE orders.CUST_CODE = x;
// Stefano
router.get("/customers/:c_code", verifyToken, authorizeRoles("customer"), async (req, res) => {
    //const { custCode } = req.params;
    const custCode = req.params.c_code;
    console.log("prendo ordini di ", custCode)
    const orders = await db.queryAgents('SELECT * FROM ORDERS WHERE "CUST_CODE" = $1', [custCode]);
    const formattedOrders = orders.rows.map(order => {
        // Imposta il fuso orario a zero
        const dateWithZeroTimezone = new Date(order.ORD_DATE);
        dateWithZeroTimezone.setMinutes(dateWithZeroTimezone.getMinutes() - dateWithZeroTimezone.getTimezoneOffset());
        return {
            ...order,
            ORD_DATE: dateWithZeroTimezone.toISOString().split('T')[0]
        }
    })
    try {
        console.log('Orders: ', orders.rows)
        //res.status(200).json(orders.rows)
        res.status(200).json(formattedOrders)
    } catch (err) {
        res.status(500).json(err)
        console.error(err)
    }
})

//GET ordini - agents
// SELECT * FROM "ORDERS" WHERE orders.AGENT_CODE = x;
// Stefano
router.get("/agents/:a_code", verifyToken, authorizeRoles("agent"), async (req, res) => {
    const agentCode = req.params.a_code;
    console.log("prendo gli ordini di agente ", agentCode);
    const orders = await db.queryAgents('SELECT * FROM ORDERS WHERE "AGENT_CODE" = $1', [agentCode]);

    const formattedOrders = orders.rows.map(order => {
        // Imposta il fuso orario a zero
        const dateWithZeroTimezone = new Date(order.ORD_DATE);
        dateWithZeroTimezone.setMinutes(dateWithZeroTimezone.getMinutes() - dateWithZeroTimezone.getTimezoneOffset());
        return {
            ...order,
            ORD_DATE: dateWithZeroTimezone.toISOString().split('T')[0]
        }
    })

    try {
        //res.status(200).json(orders.rows)
        res.status(200).json(formattedOrders)
    } catch (err) {
        res.status(500).json(err)
        console.error(err)
    }
})

//Nuova versione GET orders - Acqua
/**
 * La chiamata puo venire da frontend o API, ricevo un target che puo essere customer/agent e il token.
 * Analizzo il token per verificare che un utente abbia i permessi per richiedere gli ordini del target
 * (ovvero: Target == Mittente || Mittente = dirigent )
 */
router.get("/", verifyToken, async (req, res) => {
  const decoded = jwt.verify(req.headers.authorization, 'secret');
  //console.log("decoded = ", decoded)
  const mittente = decoded.id;
  const mit_role = decoded.role;
  console.log('il ruolo è: ', mit_role)
  let orders;

  if(Object.keys(req.query).length > 0){
    if((req.query.customer !== undefined)){
      const target = req.query.customer;
      console.log("target customer: ", target);
      if(target === mittente || mit_role === "dirigent"){
        orders = await db.queryAgents('SELECT * FROM ORDERS WHERE "CUST_CODE" = $1;', [target]);
      }else {
        res.status(403).json({});;
        return;
      }
    }else if(req.query.agent !== undefined){
      const target = req.query.agent;
      console.log("target agent: ", target);
      if(target === mittente || mit_role === "agent"){
        orders = await db.queryAgents('SELECT * FROM ORDERS WHERE "AGENT_CODE" = $1;', [target]);
      }else {
        res.status(403).json({});;
        return;
      }      
    }
  }else {
    //DIRIGENT ZONE
    if(mit_role === "dirigent"){
      console.log("dirigent - zone")
      orders = await db.queryAgents('SELECT * FROM ORDERS;');
    }else {
      console.log("Permessi insufficienti")
      res.status(403).json({});
      return;
    }
  }
/*
  if(orders === undefined){
    res.status(400);
    return;
  }*/

  try {
    const formattedOrders = orders.rows.map(order => {
    // Imposta il fuso orario a zero
    const dateWithZeroTimezone = new Date(order.ORD_DATE);
    dateWithZeroTimezone.setMinutes(dateWithZeroTimezone.getMinutes() - dateWithZeroTimezone.getTimezoneOffset());
    return {
        ...order,
        ORD_DATE: dateWithZeroTimezone.toISOString().split('T')[0]
    }
    })
    res.status(200).json(formattedOrders)
  } catch (err) {
      res.status(500).json(err)
      console.error(err)
  }
})

// PUT - modifica ordine
// Stefano
router.put("/:orderID", async (req, res) => { //manca verifyToken
  const { orderID } = req.params;
  const updatedOrder = req.body;
  console.log('ordine nuovo: ', updatedOrder)


  //const { ord_amount, advance_amount, ord_date, cust_code, agent_code, ord_description } = updatedOrder;
  const ord_amount = updatedOrder.ORD_AMOUNT;
  const advance_amount = updatedOrder.ADVANCE_AMOUNT;
  const ord_date = updatedOrder.ORD_DATE;
  const cust_code = updatedOrder.CUST_CODE;
  const agent_code = updatedOrder.AGENT_CODE;
  const ord_description = updatedOrder.ORD_DESCRIPTION;

  try {
    const query = `
      UPDATE orders
      SET "ORD_AMOUNT" = $1, "ADVANCE_AMOUNT" = $2, "ORD_DATE" = $3, "CUST_CODE" = $4, "AGENT_CODE" = $5, "ORD_DESCRIPTION" = $6
      WHERE "ORD_NUM" = $7
      RETURNING *;
    `;
    const values = [ord_amount, advance_amount, ord_date, cust_code, agent_code, ord_description, orderID];

    const result = await db.queryAgents(query, values);

    if (result.rowCount === 0) {
      res.status(404).json({ message: "Order not found" });
    } else {
      res.status(200).json(result.rows[0]);
    }
  } catch (err) {
    res.status(500).json(err);
    console.error(err);
  }
})

/*router.delete("/:orderID", async (req, res) => {
  const { orderID } = req.params;
  console.log("order number to DELETE = ", orderID)
  //console.log('body = ', req.headers) se verifyToken rompe, posso prendere il token da qua, ma va "forgiato"
  const result = await db.queryAgents('DELETE FROM "ORDERS" WHERE "ORD_NUM" = \''+ orderID + "';");
  //console.log("result = ", result);
  if (result.rowCount === 0) {
    console.log("order not found");
    res.status(404).json({ message: "Order not found" });
  } else {
    console.log("eliminato correttamente");
    res.status(200).json(result.rows[0]);
  }
})*/

router.delete("/:orderID", async (req, res) => {
  const { orderID } = req.params;
  console.log("order number to DELETE = ", orderID);

  try {
    const result = await db.queryAgents('DELETE FROM ORDERS WHERE "ORD_NUM" = $1;', [orderID]);

    if (result.rowCount === 0) {
      console.log("order not found");
      res.status(404).json({ message: "Order not found" });
    } else {
      console.log("eliminato correttamente");
      res.status(200).json({ message: "Order successfully deleted" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/", async (req, res) => {
    const newOrder = req.body;
    console.log(newOrder)

    const ord_num = newOrder.ORD_NUM;
    const ord_amount = newOrder.ORD_AMOUNT;
    const advance_amount = newOrder.ADVANCE_AMOUNT;
    const ord_date = newOrder.ORD_DATE;
    const cust_code = newOrder.CUST_CODE;
    const agent_code = newOrder.AGENT_CODE;
    const ord_description = newOrder.ORD_DESCRIPTION;



    try {
        const query = `
          INSERT INTO orders ("ORD_NUM", "ORD_AMOUNT", "ADVANCE_AMOUNT", "ORD_DATE", "CUST_CODE", "AGENT_CODE", "ORD_DESCRIPTION")
          VALUES ($1, $2, $3, $4, $5, $6, $7)
          RETURNING *;
        `;
        const values = [ord_num, ord_amount, advance_amount, ord_date, cust_code, agent_code, ord_description];

        const result = await db.queryAgents(query, values);

        res.status(201).json(result.rows[0]);
      } catch (err) {
        res.status(500).json({ error: 'Internal Server Error', details: err });
        console.error(err);
      }
})

export { router as ordersRouter };
