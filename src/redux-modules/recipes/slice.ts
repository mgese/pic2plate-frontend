import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IRecipe } from '../../types/Recipe';

export type LoadingState = 'NONE' | 'PENDING' | 'SUCCESS' | 'ERROR';

interface RecipeState {
    recipes: IRecipe[];
    favouriteRecipes: IRecipe[];
    loadingState: LoadingState;
    keys: string[];
    value: string;
}

const initialState: RecipeState = {
    recipes: [],
    favouriteRecipes: [],
    loadingState: 'NONE',
    keys: [],
    value: '',
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
        addKey(state, { payload }: PayloadAction<string>) {
            if (!state.keys.includes(payload)) {
                state.keys.push(payload);
            }
        },
        addKeys(state, { payload }: PayloadAction<string[]>) {
            state.keys = payload;
        },
        removeKey(state, { payload }: PayloadAction<string>) {
            state.keys = state.keys.filter((key) => key !== payload);
        },
        setValue(state, { payload }: PayloadAction<string>) {
            state.value = payload;
        },
    },
});

export const {
    addRecipes,
    updateRecipe,
    addFavouriteRecipe,
    addKeys,
    addFavouriteRecipes,
    removeFavouriteRecipe,
    addKey,
    setValue,
    removeKey,
    setLoadingState,
} = recipeSlice.actions;

export const recipeReducer = recipeSlice.reducer;
