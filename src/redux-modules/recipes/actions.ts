import { AppDispatch } from '../store';
import { IRecipe } from '../../types/Recipe';
import {
    addFavouriteRecipes,
    addRecipes,
    removeFavouriteRecipe,
    updateRecipe,
} from './slice';
import { getFavouriteRecipes } from '../../api/favourite-recipes/get';
import { getAiRecipes } from '../../api/recipes/get';
import { postRecipe } from '../../api/favourite-recipes/post';
import { deleteRecipe } from '../../api/favourite-recipes/delete';
import { postImage } from '../../api/image/post';

export const loadFavouriteRecipes =
    () =>
    async (dispatch: AppDispatch): Promise<void> => {
        const { status, data } = await getFavouriteRecipes();

        if (status === 200 && data) {
            dispatch(addFavouriteRecipes(data));
        }
    };

export const loadRecipes =
    (imageUrl: string) =>
    async (dispatch: AppDispatch): Promise<void> => {
        const { status, data } = await getAiRecipes(imageUrl);

        if (status === 200 && data) {
            dispatch(addRecipes(data));
        }
    };

export const uploadImage =
    (file: File) => async (): Promise<string | undefined> => {
        const result = await postImage({ file });

        if (result) {
            const { key, base } = result;

            return `${base}/${key}`;
        }

        return undefined;
    };

export const addRecipe =
    (recipe: IRecipe) =>
    async (dispatch: AppDispatch): Promise<void> => {
        const { status, data } = await postRecipe(recipe);

        if (status === 200 && data) {
            dispatch(updateRecipe({ newId: data, oldId: recipe.id }));
        }
    };

export const removeRecipe =
    (id: number) =>
    async (dispatch: AppDispatch): Promise<void> => {
        const { status } = await deleteRecipe(id);

        if (status === 200) {
            dispatch(removeFavouriteRecipe(id));
        }
    };
