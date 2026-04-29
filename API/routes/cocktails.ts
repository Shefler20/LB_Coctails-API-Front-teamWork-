import express from "express";
import Cocktail from "../models/Cocktail";
import mongoose from "mongoose";
import auth, {RequestWithUser} from "../middleware/auth";
import {imagesUpload} from "../middleware/multer";

export const cocktailRouter = express.Router();

cocktailRouter.get("/", async (req, res) => {
  const query: { user?: string } = {};

  if (req.query.user) {
    query.user = req.query.user as string;
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

cocktailRouter.post("/", auth, imagesUpload.single("image"), async (req, res, next) => {
      const { user } = req as RequestWithUser;

      try {
        if (!req.body?.title || !req.body?.receipt) {
          return res.status(400).send({ error: "Title and receipt are required" });
        }

        if (!req.file) {
          return res.status(400).send({ error: "Image is required" });
        }

        if (!req.body.ingredients) {
          return res.status(400).send({ error: "Ingredients are required" });
        }
        let ingredients: { title: string; quantity: string }[];
        try {
          ingredients =
              typeof req.body.ingredients === "string"
                  ? JSON.parse(req.body.ingredients)
                  : req.body.ingredients;
        } catch {
          return res.status(400).send({ error: "Invalid ingredients format" });
        }

        if (!Array.isArray(ingredients) || ingredients.length === 0) {
          return res.status(400).send({ error: "Ingredients are required" });
        }

        if (!ingredients.every(i => i.title && i.quantity)) {
          return res.status(400).send({ error: "Invalid ingredients" });
        }

        const newCocktail = new Cocktail({
          user: user._id,
          title: req.body.title,
          receipt: req.body.receipt,
          image: "images/" + req.file.filename,
          ingredients,
          ratings: [],
        });

        await newCocktail.save();
        res.send(newCocktail);
      } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
          return res.status(400).send(e);
        }

        next(e);
      }
    }
);