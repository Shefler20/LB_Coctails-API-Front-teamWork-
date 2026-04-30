import {createAsyncThunk} from "@reduxjs/toolkit";
import type {ICocktail, ICocktailMutation, ValidationError} from "../../types";
import axiosApi from "../../axiosApi.ts";
import {toast} from "react-toastify";
import {isAxiosError} from "axios";

export const getAllCocktails = createAsyncThunk<ICocktail[], string | void>(
  "cocktails/getAllCocktails",
  async (query) => {
    const {data: cocktails} = await axiosApi<ICocktail[]>(query ? `cocktails?user=${query}` : "cocktails");

    return cocktails;
  }
);

export const getDetailCocktails = createAsyncThunk<ICocktail, string>(
  "cocktails/getDetailCocktails",
  async (cocktailId) => {
    const {data: cocktail} = await axiosApi<ICocktail>(`cocktails/${cocktailId}`);

    return cocktail
  }
)

export const createCocktail = createAsyncThunk<void, ICocktailMutation, {
  rejectValue: ValidationError
}>(
  "cocktails/createCocktail",
  async (cocktailMutation, {rejectWithValue}) => {
    const formData = new FormData();
    const keys = Object.keys(cocktailMutation) as (keyof ICocktailMutation)[];

    keys.forEach((key) => {
      const value = cocktailMutation[key];

      if (Array.isArray(value)) {
        const modifiedArrayInString = JSON.stringify(value);
        formData.append(key, modifiedArrayInString);
      } else {
        formData.append(key, value);
      }
    });

    try {
      await axiosApi.post<ICocktail>("/cocktails", formData);
      toast.success("Successfully created cocktail.");
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data);
      }
      throw e;
    }
  }
)

export const deleteCocktail = createAsyncThunk<void, string>(
  "cocktails/deleteCocktail",
  async (id) => {
    await axiosApi.delete(`cocktails/${id}`);
  }
)

export const publicateCocktail = createAsyncThunk<void, string>(
  "cocktails/publicateCocktail",
  async (albumId) => {
    await axiosApi.patch(`admin/cocktails/${albumId}/togglePublished`);
  }
)

export const createCocktailRating = createAsyncThunk<ICocktail, {id: string, rating: number}>(
  "cocktails/createCocktailRating",
  async ({id, rating}) => {
    const {data: changedCocktail} = await axiosApi.patch(`cocktails/${id}`, {rating: rating});

    return changedCocktail
  }
)