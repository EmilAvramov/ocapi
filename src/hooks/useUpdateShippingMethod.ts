import { IBasket } from '@basket-types';
import { IBasketContext } from '@context-types';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { shopAPI } from '../config/httpConfig';
import { UseBasket } from '../contexts/Basket.context';

export const useUpdateShippingMethod = () => {
	const { basket, setBasket } = UseBasket() as IBasketContext;
	const [dataError, setDataError] = useState<string | null>(null);
	const [token, setToken] = useState<string | null>(null);
	const [method, setMethod] = useState<string | null>(null);

	const makeUpdateRequest = (token: string | null, method: string) => {
		setToken(token)
		setMethod(method)
	}

	useEffect(() => {
		if (method && basket && token) {
			axios
				.put<IBasket>(
					`${shopAPI}/baskets/${basket.basket_id}/shipments/me/shipping_method`,
					{
						id: method,
					},
					{
						headers: {
							Authorization: token,
						},
					}
				)
				.then((res) => {
					setBasket(res.data)
                    setMethod(null)
				}).catch(err => {
					setDataError(err.message)
				});
		}
	}, [basket, method, setBasket, token]);

	return { makeUpdateRequest, dataError };
};
