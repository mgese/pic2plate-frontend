import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IRecipe } from '../../types/Recipe';
import recipes from '../../components/recipes/Recipes';

interface RecipeState {
    recipes: IRecipe[];
    favouriteRecipes: IRecipe[];
}

const initialState: RecipeState = {
    recipes: [],
    favouriteRecipes: [],
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
} = recipeSlice.actions;

export const recipeReducer = recipeSlice.reducer;
