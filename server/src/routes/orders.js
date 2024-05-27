import express from "express";
import mongoose from "mongoose";
import { verifyToken } from "./user.js";
import * as db from './../db/index.js';

const router = express.Router();

router.get("/", async (req, res) => {
  console.log("got api request")
  try {
    const result = await db.query('SELECT * FROM orders;')
    console.log(result)
    // 2) lista ordini del cliente 
    // SELECT * FROM orders WHERE orders.CUST_CODE = x;
    // query per selezionare agente in base all'ordine, quando serve viene chiamata
    // SELECT * FROM agents WHERE agents.AGENT_CODE = x;

    // 3) lista ordini dell'agente + lista customers presenti nell'ordine
    // SELECT * FROM orders WHERE orders.AGENT_CODE = x;
    // ELECT * FROM orders WHERE orders.AGENT_CODE = x;

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
    console.error(err)
  }
});

// Create a new recipe
router.post("/", verifyToken, async (req, res) => {
  const recipe = new RecipesModel({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    image: req.body.image,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions,
    imageUrl: req.body.imageUrl,
    cookingTime: req.body.cookingTime,
    userOwner: req.body.userOwner,
  });
  console.log(recipe);

  try {
    const result = await recipe.save();
    res.status(201).json({
      createdRecipe: {
        name: result.name,
        image: result.image,
        ingredients: result.ingredients,
        instructions: result.instructions,
        _id: result._id,
      },
    });
  } catch (err) {
    // console.log(err);
    res.status(500).json(err);
  }
});


export { router as ordersRouter };
