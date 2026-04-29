import express from "express";
import Cocktail from "../models/Cocktail";
import mongoose from "mongoose";

export const cocktailRouter = express.Router();

cocktailRouter.get("/", async (req, res) => {
  const query: { userId?: string } = {};

  if (req.query.userId) {
    query.userId = req.query.userId as string;
  }

  try {
    const cocktails = await Cocktail.find(query).select('-receipt');

    res.send(cocktails);
  } catch {
    res.status(500);
  }
})

cocktailRouter.get("/:id", async (req, res) => {
  const {id} = req.params;
  const isValidId = mongoose.Types.ObjectId.isValid(id);

  if (!id || !isValidId) {
    return res.status(400).send({error: "Invalid ID"});
  }

  try {
    const cocktail = await Cocktail.findById(id).populate("ratings.user");

    if (!cocktail) {
      return res.status(404).send({error: "Cocktail not found"});
    }
    const cocktailObj = cocktail.toObject();
    const sumRating = cocktail.ratings.reduce((acc, rate) => acc + rate.rating, 0);
    const averageRating = cocktail.ratings.length > 0 ? (sumRating / cocktail.ratings.length) : 0;
    const modifiedDetailCocktail = {
      ...cocktailObj,
      averageRating,
      ratingQuantity: cocktail.ratings.length,
    }

    return res.send(modifiedDetailCocktail);
  } catch (e) {
    res.status(500);
  }
})