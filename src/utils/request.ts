import { getAccessToken, getUser, setWaitCursor } from 'chayns-api';
import { IS_DEVELOPMENT, IS_QA } from '../constants/environment';

export const BASE_REST_PATH = IS_DEVELOPMENT || IS_QA ? '' : '';

interface RequestOptions<Body> {
    accessToken?: string;
    auth?: boolean;
    backendVersion?: string;
    basicAuth?: boolean;
    body?: Body;
    method:
        | 'GET'
        | 'HEAD'
        | 'POST'
        | 'PUT'
        | 'DELETE'
        | 'CONNECT'
        | 'OPTIONS'
        | 'TRACE'
        | 'PATCH';
    route?: string;
    showWaitCursor?: boolean;
    url?: string;
    waitCursorText?: string;
}

interface Meta {
    [key: string]: unknown;

    body?: BodyInit | null;
    method: string;
    url: string;
}

export interface RequestResult<Data = unknown> {
    [key: string]: unknown;

    data?: Data;
    error?: Error | undefined;
    meta: Meta;
    requestDuration?: number;
    retryAfter?: number;
    status?: number;
}

export const request = async <Data = null, Body = null>({
    accessToken,
    auth = true,
    backendVersion,
    basicAuth = false,
    body,
    method,
    route = '',
    showWaitCursor = false,
    url = `${BASE_REST_PATH}${
        typeof backendVersion === 'string' ? backendVersion : ''
    }`,
    waitCursorText,
}: RequestOptions<Body>): Promise<RequestResult<Data>> => {
    const headers: HeadersInit = {};

    const tobitAccessToken = (await getAccessToken())?.accessToken;

    const isAuthenticated = (getUser()?.personId ?? '') !== '';

    if (basicAuth && accessToken) {
        headers.Authorization = `basic ${accessToken}`;
    } else if (isAuthenticated && auth) {
        headers.Authorization = `bearer ${
            accessToken ?? tobitAccessToken ?? ''
        }`;
    }

    const requestData: RequestInit = {
        credentials: 'same-origin',
        headers,
        method,
    };

    if (method !== 'GET') {
        headers['Content-Type'] = 'application/json';

        if (body) {
            requestData.body = JSON.stringify(body);
        }
    }

    const result: RequestResult<Data> = {
        meta: {
            method,
            url: url + route,
            body: requestData.body,
        },
    };

    if (showWaitCursor) {
        void setWaitCursor({
            isEnabled: true,
            text: waitCursorText,
        });
    }

    const requestStart: number = Date.now();

    try {
        const response: Response = await fetch(url + route, requestData);

        result.requestDuration = Date.now() - requestStart;
        result.status = response.status;

        try {
            const dataString = await response.text();

            if (dataString && dataString.length > 0) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                result.data = JSON.parse(dataString);
            }
        } catch (error) {
            if (error) {
                // @ts-expect-error: Type is correct here
                result.error = error;
            }
        }

        if (response.status === 429) {
            const retryAfterHeaderValue = response.headers.get('retry-after');

            if (typeof retryAfterHeaderValue === 'string') {
                let parsedRetryAfterValue;

                try {
                    parsedRetryAfterValue = parseInt(retryAfterHeaderValue, 10);

                    if (
                        typeof parsedRetryAfterValue === 'number' &&
                        !Number.isNaN(parsedRetryAfterValue)
                    ) {
                        result.retryAfter = parsedRetryAfterValue;
                    }
                } catch (error) {
                    if (error) {
                        // @ts-expect-error: Type is correct here
                        result.error = error;
                    }
                }
            }
        }
    } catch (error) {
        result.requestDuration = Date.now() - requestStart;

        if (error) {
            // @ts-expect-error: Type is correct here
            result.error = error;
        }
    }

    if (showWaitCursor) {
        void setWaitCursor({
            isEnabled: false,
        });
    }

    return result;
};
