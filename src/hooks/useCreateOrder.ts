import axios from 'axios';
import { useEffect, useState } from 'react';

import { shopAPI } from '../config/httpConfig';
import { UseBasket } from '../contexts/Basket.context';

import { IBasketContext } from '@context-types';

export const useCreateOrder = () => {
    const { basket } = UseBasket() as IBasketContext
	const [token, setToken] = useState<string | null>(null);
	const [dataError, setDataError] = useState<string | null>(null);
    const [order, setOrder] = useState<any>(false);

	const makeCreateRequest = (token: string | null) => {
		setToken(token)
	}

	useEffect(() => {
		if (token && basket && !order) {
			axios
				.post(
					`${shopAPI}/orders`,
					{ basket_id: basket.basket_id},
					{
						headers: {
							Authorization: token,
						},
					}
				)
				.then((res) => {
					setOrder(res.data);
				})
				.catch((err) => {
					setDataError(err.message);
				});
		}
	}, [basket, order, token]);

	return { order, makeCreateRequest, dataError };
};
