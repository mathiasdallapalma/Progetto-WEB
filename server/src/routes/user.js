import express, { json } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import * as db from './../db/index.js';

const router = express.Router();

router.post("/register", async (req, res) => { 
  res.json({ message: "User registered successfully" });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  console.log("username="+username+" password="+password);

  // TODO qua dovrebbe cercare nel db user e password
  // Bozza di Aley
  //const passhash = bcrypt.hash(password, "sale",); per la registrazione
  const tmp = await db.query('SELECT * from users WHERE "username"=\'' + username + '\' LIMIT 1;');
  if(tmp.rowCount != 1){
    res.sendStatus(404); //user not found
  }else{

    bcrypt.compare(password, row.password, function(err, res) {
      if (err){
        res.err(err); 
      }
      if (res) {
        //se la pass inserita è uguale a quella del db allora gli do il token
        // "firmando" l'username con SHA256 (secret è un parametro di jwt)
        const token = jwt.sign({ id: username }, "secret");
        res.json({ token, userID: username })
      } else {
        return res.json({success: false, message: 'passwords do not match'});
      }
    });
    
  }
  /* prima c'era solo questo
  const token = jwt.sign({ id: "0000" }, "secret");
  res.json({ token, userID: "0000" });*/
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
