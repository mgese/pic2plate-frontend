import { getUser } from 'chayns-api';
import { request } from '../../utils/request';
import { ApiFunctionResult } from '../../types/api';
import { IRecipe } from '../../types/Recipe';

interface PostPreferencesBody {
    personId: string;
    names: string[];
}

export const postPreferences = async (
    tags: string[]
): Promise<ApiFunctionResult<IRecipe[]>> => {
    const user = getUser();

    const response = await request<void, PostPreferencesBody>({
        method: 'POST',
        body: {
            personId: user?.personId ?? '',
            names: tags,
        },
        route: `Preference`,
    });

    return { status: response.status };
};
