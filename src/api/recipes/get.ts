import { request } from '../../utils/request';
import { ApiFunctionResult } from '../../types/api';
import { IRecipe } from '../../types/Recipe';

interface GetAiRecipesBody {
    imageUrl: string[];
    tags: string;
}

export const getAiRecipes = async (
    imageUrl: string[],
    tags: string
): Promise<ApiFunctionResult<IRecipe[]>> => {
    const response = await request<IRecipe[], GetAiRecipesBody>({
        method: 'POST',
        url: 'https://run.chayns.codes/',
        body: { imageUrl, tags },
        route: `2f3d0fbc/recipe`,
    });

    return { data: response.data, status: response.status };
};
