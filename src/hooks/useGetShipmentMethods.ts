import axios from 'axios';
import { useEffect, useState } from 'react';

import { shopAPI } from '../config/httpConfig';
import { UseBasket } from '../contexts/Basket.context';

import { IBasketContext } from '@context-types';
import { IShipmenthData } from '@shipment-types';

export const useGetShipmentMethods = () => {
	const { basket } = UseBasket() as IBasketContext;
	const [token, setToken] = useState<string | null>(null);
	const [methods, setMethods] = useState<IShipmenthData | null>(null);
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
				.get<IShipmenthData>(
					`${shopAPI}/baskets/${basket.basket_id}/shipments/me/shipping_methods`,
					{
						headers: {
							Authorization: token,
						},
					}
				)
				.then((res) => {
					setMethods(res.data)
					setDataError('');
					setLoading(false);
				})
				.catch((err) => {
					setDataError(err.message);
					setLoading(false);
				});
		}
	}, [basket, makeRequest, token]);

	return { methods, getMethods, dataError, loading };
};
