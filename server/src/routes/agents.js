import express from "express";
import mongoose from "mongoose";
import { verifyToken } from "./user.js";
import db from './../db/index.js';

const router = express.Router();

router.get("/:agentCode", async (req, res) => {
    const { agentCode } = req.params
    try {
        console.log("cerco agent con code", agentCode)
        const result = await db.queryAgents('SELECT * FROM AGENTS WHERE "AGENT_CODE" = $1', ['A010']);
        //console.log('agente:', result.rows[0])
        if (result.rowCount == 0) {
            return res.status(404).json({ message: "Agent not found :(" })
        }
        res.status(200).json(result.rows[0])
    } catch (error) {
        res.status(500).json(error)
        console.error(error)
    }
})

export { router as agentRouter }