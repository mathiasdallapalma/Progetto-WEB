import express from "express";
import mongoose from "mongoose";
import { verifyToken } from "./user.js";
import * as db from './../db/index.js';

const router = express.Router();

router.get("/customer/:idcust", async (req, res) => {
  console.log("got api request:: /customer/:idcust")
  const x = req.params.idcust;
  try {
    const result = await db.query('SELECT * FROM customer WHERE "CUST_CODE" = \'' + x + '\';')
    console.log(result)
    res.status(200).json(result.rows[0]);
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


export { router as customerRouter };
