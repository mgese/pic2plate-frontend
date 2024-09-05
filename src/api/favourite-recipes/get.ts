import { getUser } from 'chayns-api';
import { request } from '../../utils/request';
import { ApiFunctionResult } from '../../types/api';
import { IRecipe } from '../../types/Recipe';

export const getFavouriteRecipes = async (): Promise<
    ApiFunctionResult<IRecipe[]>
> => {
    const user = getUser();

    const response = await request<IRecipe[]>({
        method: 'GET',
        route: `recipe/${user?.personId ?? ''}`,
    });

    return { data: response.data, status: response.status };
};
