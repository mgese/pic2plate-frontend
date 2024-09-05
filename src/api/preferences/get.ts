import { getUser } from 'chayns-api';
import { request } from '../../utils/request';
import { ApiFunctionResult } from '../../types/api';

export const getPreferences = async (): Promise<
    ApiFunctionResult<string[]>
> => {
    const user = getUser();

    const response = await request<string[]>({
        method: 'GET',
        route: `Preference/${user?.personId ?? ''}`,
    });

    return { data: response.data, status: response.status };
};
