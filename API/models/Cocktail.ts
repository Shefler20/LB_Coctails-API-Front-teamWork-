import mongoose from "mongoose";
import User from "./User";

const Schema = mongoose.Schema;

const IngredientSchema = new Schema({
  title: {type: String, required: true},
  quantity: {type: String, required: true},
});

const RatingSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    validate: {
      validator: async (userId: string) => {
        const user = await User.findById(userId);
        if (!user) return false

        return true;
      },
      message: "User's is not exist",
    }
  },
  rating: {type: Number, required: true},
});

const CocktailSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    validate: {
      validator: async (userId: string) => {
        const user = await User.findById(userId);
        if (!user) return false

        return true;
      },
      message: "User's is not exist",
    }
  },
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  receipt: {
    type: String,
    required: true,
  },
  isPublished: {
    type: Boolean,
    default: false,
  },
  ingredients: [IngredientSchema],
  ratings: [RatingSchema],
});

const Cocktail = mongoose.model("Cocktail", CocktailSchema);
export default Cocktail;