import express from "express";
import mongoose from "mongoose";
import { verifyToken, authorizeRoles } from "./user.js";
import db from './../db/index.js';

const router = express.Router();

//GET che ignora controlli
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
});

//TODO
//GET ordini - customer
// SELECT * FROM orders WHERE orders.CUST_CODE = x;
// Stefano
router.get("/customers/:c_code", verifyToken, authorizeRoles("customer"), async (req, res) => {
    //const { custCode } = req.params;
    const custCode = req.params.c_code;
    console.log("prendo ordini di ", custCode)
    const orders = await db.queryAgents('SELECT * FROM ORDERS WHERE "CUST_CODE" = $1', [custCode]);
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
router.get("/:a_code", verifyToken, async (req, res) => { //ho tolto verifyToken
  const user_code = req.params.a_code;
  console.log("recupero utente con username: ", user_code);
  const user = (await db.queryUsers('SELECT * FROM "USERS" WHERE "USERNAME" = $1', [user_code])).rows[0];
  console.log("user = ", user);  
  const user_role = user.role;
  console.log("role = ", user_role)
  
  switch (user_role) {
    case "customer":
      var where = ('SELECT * FROM "ORDERS" WHERE "CUST_CODE" = \'' + user.username + "\'");
      break;
    case "agent":
      var where = ('SELECT * FROM "ORDERS" WHERE "AGENT_CODE" = \'' + user.username + "\'");
      break;
    case "dirigente":
      var where = 'SELECT * FROM "ORDERS"';
      break;
    default:
      console.log("Errore, ruolo non ricnosciuto [$1]",user_role);
      res.status(500);
      break;
  }
  
  //console.log("where = ", where);
  const orders = await db.queryAgents(where);

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
  /*
  const orders = await db.queryAgents('SELECT * FROM ORDERS WHERE "$1" = $1', [user.username]);

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
  */
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
      UPDATE "ORDERS"
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

router.delete("/:orderID", verifyToken, async (req, res) => {
  const { orderID } = req.params;
  console.log("order number to DELETE = ", orderID)
  //console.log('body = ', req.headers) se verifyToken rompe, posso prendere il token da qua, ma va "forgiato"
  const result = await db.queryAgents('DELETE FROM orders WHERE "ORD_NUM" = \''+ orderID + "';");
  //console.log("result = ", result);
  if (result.rowCount === 0) {
    console.log("order not found");
    res.status(404).json({ message: "Order not found" });
  } else {
    console.log("eliminato correttamente");
    res.status(200).json(result.rows[0]);
  }
})

export { router as ordersRouter };
