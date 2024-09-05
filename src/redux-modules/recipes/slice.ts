import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IRecipe } from '../../types/Recipe';

export type LoadingState = 'NONE' | 'PENDING' | 'SUCCESS' | 'ERROR';

interface RecipeState {
    recipes: IRecipe[];
    favouriteRecipes: IRecipe[];
    loadingState: LoadingState;
}

const initialState: RecipeState = {
    recipes: [],
    favouriteRecipes: [],
    loadingState: 'NONE',
};

const recipeSlice = createSlice({
    name: 'recipe',
    initialState,
    reducers: {
        addRecipes(state, { payload }: PayloadAction<IRecipe[]>) {
            state.recipes = [...state.recipes, ...payload];
        },
        addFavouriteRecipes(state, { payload }: PayloadAction<IRecipe[]>) {
            state.favouriteRecipes = [...state.favouriteRecipes, ...payload];
        },
        setLoadingState(state, { payload }: PayloadAction<LoadingState>) {
            state.loadingState = payload;
        },
        addFavouriteRecipe(state, { payload }: PayloadAction<IRecipe>) {
            if (
                !state.favouriteRecipes.some(
                    (recipe) => recipe.id === payload.id
                )
            ) {
                state.favouriteRecipes.push(payload);
            }
        },
        removeFavouriteRecipe(state, { payload }: PayloadAction<number>) {
            state.favouriteRecipes = state.favouriteRecipes.filter(
                (recipe) => recipe.id !== payload
            );
        },
        updateRecipe(
            state,
            { payload }: PayloadAction<{ oldId: number; newId: number }>
        ) {
            const { oldId, newId } = payload;

            state.favouriteRecipes = state.favouriteRecipes.map((recipe) => {
                if (recipe.id === oldId) {
                    return { ...recipe, id: newId };
                }
                return recipe;
            });

            state.recipes = state.recipes.map((recipe) => {
                if (recipe.id === oldId) {
                    return { ...recipe, id: newId };
                }
                return recipe;
            });
        },
    },
});

export const {
    addRecipes,
    updateRecipe,
    addFavouriteRecipe,
    addFavouriteRecipes,
    removeFavouriteRecipe,
    setLoadingState,
} = recipeSlice.actions;

export const recipeReducer = recipeSlice.reducer;
