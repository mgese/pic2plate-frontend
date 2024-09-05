import { request } from '../../utils/request';
import { ApiFunctionResult } from '../../types/api';

export const getPreferences = async (): Promise<
    ApiFunctionResult<string[]>
> => {
    const response = await request<string[]>({
        method: 'GET',
        route: `2f3d0fbc/recipe`,
    });

    return { data: response.data, status: response.status };
};
