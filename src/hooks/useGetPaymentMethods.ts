import { IBasketContext } from '@context-types';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { clientID, proxy, shopAPI } from '../config/httpConfig';
import { UseBasket } from '../contexts/Basket.context';

export const useGetPaymentMethods = () => {
	const { basket } = UseBasket() as IBasketContext;
	const [token, setToken] = useState<string | null>(null);
	const [methods, setMethods] = useState<any>(null);
	const [makeRequest, setMakeRequest] = useState<boolean>(false);
	const [dataError, setDataError] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(false);

	const getMethods = (token: string | null) => {
		setMakeRequest((prev) => !prev);
		setToken(token)
	};

	useEffect(() => {
		if (basket && token) {
			setLoading(true);
			axios
				.get(
					`${proxy}${shopAPI}/baskets/${basket?.basket_id}/payment_methods?${clientID}`,
					{
						headers: {
							Authorization: token,
						},
					}
				)
				.then((res) => {
					console.log(res.data)
					setDataError('');
					setLoading(false);
				})
				.catch((err) => {
					setDataError(err.message);
					setLoading(false);
				});
		}
	}, [basket, makeRequest, token]);

	return { getMethods, dataError, loading };
};
