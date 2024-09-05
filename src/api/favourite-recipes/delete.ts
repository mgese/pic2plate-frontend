import { request } from '../../utils/request';
import { ApiFunctionResult } from '../../types/api';

export const deleteRecipe = async (
    id: number
): Promise<ApiFunctionResult<number>> => {
    const response = await request({
        method: 'DELETE',
        route: `recipe/${id}`,
    });

    return { status: response.status };
};
