import { createSelector } from '@reduxjs/toolkit';
import { IRecipe } from '../../types/Recipe';
import { RootState } from '../store';

export const selectRecipeState = (state: RootState) => state.recipes;

export const selectRecipes = (state: RootState): IRecipe[] =>
    selectRecipeState(state).recipes;

export const selectFavouriteRecipes = (state: RootState): IRecipe[] =>
    selectRecipeState(state).favouriteRecipes;

export const selectLoadingState = (state: RootState) =>
    selectRecipeState(state).loadingState;

export const selectIsRecipeFavourite = (id: number) =>
    createSelector([selectFavouriteRecipes], (favouriteRecipes) =>
        favouriteRecipes.some((recipe: IRecipe) => recipe.id === id)
    );
