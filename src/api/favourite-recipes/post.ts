import { getUser } from 'chayns-api';
import { request } from '../../utils/request';
import { ApiFunctionResult } from '../../types/api';
import { IRecipe } from '../../types/Recipe';

interface PostRecipeBody {
    title: string;
    recipe: string;
    personId: string;
}

export const postRecipe = async (
    recipe: IRecipe
): Promise<ApiFunctionResult<number>> => {
    const user = getUser();

    const response = await request<number, PostRecipeBody>({
        method: 'POST',
        body: {
            personId: user?.personId ?? '',
            ...recipe,
        },
        route: `recipe`,
    });

    return { data: response.data, status: response.status };
};
