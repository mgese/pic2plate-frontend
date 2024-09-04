import { request } from '../../utils/request';
import { ApiFunctionResult } from '../../types/api';
import { IRecipe } from '../../types/Recipe';

export const postRecipe = async (
    recipe: IRecipe
): Promise<ApiFunctionResult<number>> => {
    const response = await request<number, IRecipe>({
        method: 'POST',
        body: recipe,
        route: ``,
    });

    return { data: response.data, status: response.status };
};
