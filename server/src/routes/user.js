import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import * as db from './../db/index.js';

const router = express.Router();

// tests Acqua
const result = await db.query('SELECT NOW()')
console.log(result.rows[0])
// fine test Acqua


router.post("/register", async (req, res) => { 
  res.json({ message: "User registered successfully" });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  console.log(username+" "+password)

  // TODO qua dovrebbe cercare nel db user e password
  
  const token = jwt.sign({ id: "0000" }, "secret");
  res.json({ token, userID: "0000" });
});

export { router as userRouter };

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    jwt.verify(authHeader, "secret", (err) => {
      if (err) {
        return res.sendStatus(403);
      }
      next();
    });
  } else {
    res.sendStatus(401);
  }
};
