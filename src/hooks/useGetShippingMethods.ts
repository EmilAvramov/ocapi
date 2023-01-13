import axios from 'axios';
import { useEffect, useState } from 'react';

import { shopAPI } from '../config/httpConfig';
import { UseBasket } from '../contexts/Basket.context';

import { IBasketContext } from '@context-types';
import { IShipmenthData } from '@shipment-types';

export const useGetShippingMethods = () => {
	const { basket } = UseBasket() as IBasketContext;
	const [token, setToken] = useState<string | null>(null);
	const [shippingMethods, setShippingMethods] = useState<IShipmenthData | null>(null);
	const [makeRequest, setMakeRequest] = useState<boolean>(false);
	const [dataError, setDataError] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(false);

	const getShippingMethods = (token: string | null) => {
		if (!shippingMethods) {
			setMakeRequest((prev) => !prev);
		}
		setToken(token);
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
					setShippingMethods(res.data);
					setDataError('');
					setLoading(false);
				})
				.catch((err) => {
					setDataError(err.message);
					setLoading(false);
				});
		}
	}, [basket, makeRequest, token]);

	return { shippingMethods, getShippingMethods, dataError, loading };
};
