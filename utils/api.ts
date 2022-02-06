import axios, { AxiosRequestConfig, AxiosResponse, Method } from 'axios';
import OpenAPIClientAxios from 'openapi-client-axios';
import path from 'path';

/**
 * BE ONLY
 */
export const upClient = (token: string | undefined = process.env.API_KEY) =>
	new OpenAPIClientAxios({
		definition: path.resolve('./', 'utils/openapi.json'),
		// strict: true,
		// validate: true,
		withServer: 0,
		axiosConfigDefaults: {
			withCredentials: true,
			headers: {
				'Cache-Control': 'no-cache',
				Authorization: 'Bearer ' + token,
			},
		},
	});
