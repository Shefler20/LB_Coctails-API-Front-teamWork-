import {createAsyncThunk} from "@reduxjs/toolkit";
import type {
  ICocktail,
  ICocktailDetailInfo,
  ICocktailMutation
} from "../../types";
import axiosApi from "../../axiosApi.ts";
import {toast} from "react-toastify";

export const getAllCocktails = createAsyncThunk<ICocktail[], string | void>(
  "cocktails/getAllCocktails",
  async (query) => {
    const {data: cocktails} = await axiosApi<ICocktail[]>(query ? `cocktails?user=${query}` : "cocktails");

    return cocktails;
  }
);

export const getDetailCocktails = createAsyncThunk<ICocktailDetailInfo, string>(
  "cocktails/getDetailCocktails",
  async (cocktailId) => {
    const {data: cocktail} = await axiosApi<ICocktailDetailInfo>(`cocktails/${cocktailId}`);

    return cocktail
  }
)

export const createCocktail = createAsyncThunk<void, ICocktailMutation>(
  "cocktails/createCocktail",
  async (cocktailMutation) => {
    const formData = new FormData();
    const keys = Object.keys(cocktailMutation) as (keyof ICocktailMutation)[];

    keys.forEach((key) => {
      const value = cocktailMutation[key];

      if (Array.isArray(value)) {
        const modifiedArrayInString = JSON.stringify(value);
        formData.append(key, modifiedArrayInString);
      } else {
        if (value !== null) formData.append(key, value);
      }
    });

    await axiosApi.post<ICocktail>("/cocktails", formData);
    toast.success("Successfully created cocktail.");

  }
)

export const deleteCocktail = createAsyncThunk<void, string>(
  "cocktails/deleteCocktail",
  async (id) => {
    await axiosApi.delete(`admin/cocktails/${id}`);
  }
)

export const publicateCocktail = createAsyncThunk<void, string>(
  "cocktails/publicateCocktail",
  async (albumId) => {
    await axiosApi.patch(`admin/cocktails/${albumId}/togglePublished`);
  }
)

export const createCocktailRating = createAsyncThunk<ICocktailDetailInfo, {
  id: string,
  rating: number
}>(
  "cocktails/createCocktailRating",
  async ({id, rating}) => {
    const {data: changedCocktail} = await axiosApi.patch(`cocktails/${id}`, {rating: rating});

    return changedCocktail
  }
)