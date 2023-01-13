import axios, { AxiosRequestHeaders } from 'axios';
import { useEffect, useState } from 'react';

import { authEndPoint } from '../config/httpConfig';

import { IAuthError, IAuthSuccess } from '@request-types';

export const useAuth = () => {
	const [type, setType] = useState<string>('guest');
	const [customerID, setCustomerID] = useState<string | null>(null);
	const [token, setToken] = useState<string | null>(null);
	const [tokenType, setTokenType] = useState<string | null>(null);
	const [authError, setAuthError] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(false);

	const changeTokenType = (value: string) => setType(value);

	useEffect(() => {
		if (!token) {
			setLoading(true);
			axios
				.post<AxiosRequestHeaders, IAuthSuccess>(
					authEndPoint,
					{
						type: 'guest',
					},
					{
						headers: {
							'Content-Type': 'application/json',
							Accept: 'application/json',
						},
					}
				)
				.then((res) => {
					setCustomerID(res.data.customer_id);
					setToken(res.headers.authorization);
					setTokenType(res.data.auth_type);
					setLoading(false);
				})
				.catch((err: IAuthError) => {
					console.log(err);
					setAuthError(err.message);
				});
		}
	}, [token, type]);

	return { token, tokenType, customerID, authError, loading, changeTokenType };
};
