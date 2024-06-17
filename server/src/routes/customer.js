import express from "express";
import mongoose from "mongoose";
import { verifyToken } from "./user.js";
import db from './../db/index.js';

const router = express.Router();

router.get("/:code", async (req, res) => {
  console.log("API request:: /customer/:code")
  const x = req.params.code;
  try {
    console.log("cerco customer con codice", x)
    const result = await db.queryAgents('SELECT * FROM "CUSTOMER" WHERE "CUST_CODE" = $1', [x])
    //console.log(result)
    if (result.rowCount == 0) {
        return res.status(404).json({ message: "Customer not found :(" })
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json(err);
    console.error(err)
  }
});

/*
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
*/


export { router as customerRouter };
