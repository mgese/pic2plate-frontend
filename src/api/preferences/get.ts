import { getUser } from 'chayns-api';
import { request } from '../../utils/request';
import { ApiFunctionResult } from '../../types/api';

interface GetPreferenceResult {
    id: number;
    name: string;
    deletionTime: string;
}

export const getPreferences = async (): Promise<
    ApiFunctionResult<GetPreferenceResult[]>
> => {
    const user = getUser();

    const response = await request<GetPreferenceResult[]>({
        method: 'GET',
        route: `Preference/${user?.personId ?? ''}`,
    });

    return { data: response.data, status: response.status };
};
