import { request } from '../../utils/request';
import { ApiFunctionResult } from '../../types/api';
import { IRecipe } from '../../types/Recipe';

export const postPreferences = async (
    tags: string[]
): Promise<ApiFunctionResult<IRecipe[]>> => {
    const response = await request<void, string[]>({
        method: 'POST',
        body: tags,
        route: `2f3d0fbc/recipe`,
    });

    return { status: response.status };
};
