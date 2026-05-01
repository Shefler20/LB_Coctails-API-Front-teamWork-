import express from "express";
import mongoose from "mongoose";
import Cocktail from "../../models/Cocktail";

export const cocktailAdminRouter = express.Router();

cocktailAdminRouter.get("/", async (req, res) => {
  const query: {user?: string} = {};

  if (req.query.user) {
    query.user = req.query.user as string;
  }

  try {
    const cocktails = await Cocktail.find(query).select("-receipt");

    res.send(cocktails);
  } catch {
    res.status(500);
  }
});


cocktailAdminRouter.patch("/:id/togglePublished", async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id as string))
    return res.status(400).send({ error: "Invalid Cocktail id" });
  try {
    const cocktail = await Cocktail.findById(id);
    if (!cocktail) return res.status(404).send({ error: "Cocktail not found" });

    cocktail.isPublished = !cocktail.isPublished;
    await cocktail.save();
    res.send({ message: "Cocktail status updated" });
  } catch (error) {
    next(error);
  }
});

cocktailAdminRouter.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id as string))
    return res.status(400).send({ error: "Invalid Cocktail id" });
  try {
    const cocktail = await Cocktail.findById(id);
    if (!cocktail) return res.status(404).send({ error: "Cocktail not found" });

    await cocktail.deleteOne();
    res.send({ message: "Cocktail delete success" });
  } catch (error) {
    next(error);
  }
});

