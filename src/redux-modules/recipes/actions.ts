import { AppDispatch, GetAppState } from '../store';
import { IRecipe } from '../../types/Recipe';
import {
    addFavouriteRecipes,
    addKeys,
    addRecipes,
    removeFavouriteRecipe,
    setLoadingState,
    updateRecipe,
} from './slice';
import { getFavouriteRecipes } from '../../api/favourite-recipes/get';
import { getAiRecipes } from '../../api/recipes/get';
import { postRecipe } from '../../api/favourite-recipes/post';
import { deleteRecipe } from '../../api/favourite-recipes/delete';
import { postImage } from '../../api/image/post';
import { selectKeys, selectValue } from './selectors';
import { getPreferences } from '../../api/preferences/get';
import { postPreferences } from '../../api/preferences/post';

export const loadFavouriteRecipes =
    () =>
    async (dispatch: AppDispatch): Promise<void> => {
        const { status, data } = await getFavouriteRecipes();

        if (status === 200 && data) {
            dispatch(addFavouriteRecipes(data));
        }
    };

export const loadRecipes =
    (imageUrl: string[]) =>
    async (dispatch: AppDispatch, getState: GetAppState): Promise<void> => {
        const state = getState();

        const keys = selectKeys(state);
        const value = selectValue(state);

        dispatch(setLoadingState('PENDING'));

        let tags = '';

        switch (true) {
            case !!keys:
                tags = keys.join();
                break;
            case !!value:
                tags = value;
                break;
            case !!keys && !!value:
                tags = (keys as string[]).join().concat(', ', value);
                break;
            default:
                tags = '';
                break;
        }

        const { status, data } = await getAiRecipes(imageUrl, tags);

        if (status === 200 && data) {
            dispatch(setLoadingState('SUCCESS'));
            dispatch(addRecipes(data));

            return;
        }

        dispatch(setLoadingState('ERROR'));
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

export const loadPreferences =
    () =>
    async (dispatch: AppDispatch): Promise<void> => {
        const { status, data } = await getPreferences();

        if (status === 200 && data) {
            dispatch(addKeys(data));
        }
    };

export const updatePreferences =
    () =>
    async (dispatch: AppDispatch, getState: GetAppState): Promise<void> => {
        const state = getState();

        const keys = selectKeys(state);

        await postPreferences(keys);
    };
