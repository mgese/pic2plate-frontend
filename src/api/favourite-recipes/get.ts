import { request } from '../../utils/request';
import { ApiFunctionResult } from '../../types/api';
import { IRecipe } from '../../types/Recipe';

export const getFavouriteRecipes = async (): Promise<
    ApiFunctionResult<IRecipe[]>
> => {
    const response = await request<IRecipe[]>({
        method: 'GET',
        route: ``,
    });

    return { data: response.data, status: response.status };
};
