import type {RootState} from "../../app/store.ts";

export const getListOfCocktails = (state: RootState) => state.cocktails.cocktails;
export const getDetailCocktail = (state: RootState) => state.cocktails.cocktailDetail;
export const getLoadingAllCocktails = (state: RootState) => state.cocktails.getAllLoading;
export const getLoadingCreateCocktail = (state: RootState) => state.cocktails.createLoading;
export const getLoadingDeleteCocktail = (state: RootState) => state.cocktails.deleteLoading;
export const getLoadingPublicateCocktail = (state: RootState) => state.cocktails.publicateLoading;
export const getLoadingRatingCocktail = (state: RootState) => state.cocktails.patchLoading;
