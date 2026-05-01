import type {ICocktail, ICocktailDetailInfo} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {
  createCocktailRating,
  deleteCocktail,
  getAllCocktails,
  getAllAdminCocktails,
  getDetailCocktails,
  publicateCocktail
} from "./cocktailsThunks.ts";

interface CocktailsSliceState {
  cocktails: ICocktail[];
  cocktailDetail: ICocktailDetailInfo | null;
  getAllLoading: boolean;
  createLoading: boolean;
  deleteLoading: boolean;
  patchLoading: boolean;
  publicateLoading: boolean;
}

const initialState: CocktailsSliceState = {
  cocktails: [],
  cocktailDetail: null,
  getAllLoading: false,
  createLoading: false,
  deleteLoading: false,
  patchLoading: false,
  publicateLoading: false,
}

const cocktailsSlice = createSlice({
  name: "cocktails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCocktails.pending, (state) => {
      state.getAllLoading = true;
    });
    builder.addCase(getAllCocktails.fulfilled, (state, {payload: cocktails}) => {
      state.getAllLoading = false;
      state.cocktails = cocktails;
    });
    builder.addCase(getAllCocktails.rejected, (state) => {
      state.getAllLoading = false;
    });

    builder.addCase(getAllAdminCocktails.pending, (state) => {
      state.getAllLoading = true;
    });
    builder.addCase(
      getAllAdminCocktails.fulfilled,
      (state, { payload: cocktails }) => {
        state.getAllLoading = false;
        state.cocktails = cocktails;
      },
    );
    builder.addCase(getAllAdminCocktails.rejected, (state) => {
      state.getAllLoading = false;
    });

    builder.addCase(getDetailCocktails.pending, (state) => {
      state.getAllLoading = true;
    });
    builder.addCase(getDetailCocktails.fulfilled, (state, {payload: cocktailDetail}) => {
      state.getAllLoading = false;
      state.cocktailDetail = cocktailDetail;
    });
    builder.addCase(getDetailCocktails.rejected, (state) => {
      state.getAllLoading = false;
    });

    builder.addCase(deleteCocktail.pending, (state) => {
      state.deleteLoading = true;
    });
    builder.addCase(deleteCocktail.fulfilled, (state) => {
      state.deleteLoading = false;
    });
    builder.addCase(deleteCocktail.rejected, (state) => {
      state.deleteLoading = false;
    });

    builder.addCase(publicateCocktail.pending, (state) => {
      state.publicateLoading = true;
    });
    builder.addCase(publicateCocktail.fulfilled, (state) => {
      state.publicateLoading = false;
    });
    builder.addCase(publicateCocktail.rejected, (state) => {
      state.publicateLoading = false;
    });

    builder.addCase(createCocktailRating.pending, (state) => {
      state.patchLoading = true;
    });
    builder.addCase(createCocktailRating.fulfilled, (state, {payload: cocktailDetail}) => {
      state.patchLoading = false;
      state.cocktailDetail = cocktailDetail
    });
    builder.addCase(createCocktailRating.rejected, (state) => {
      state.patchLoading = false;
    });
  }
});

export const cocktailsReducer = cocktailsSlice.reducer;

