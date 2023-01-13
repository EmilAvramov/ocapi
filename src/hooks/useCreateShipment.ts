import { IBasket } from '@basket-types';
import { IBasketContext } from '@context-types';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { shopAPI } from '../config/httpConfig';
import { UseBasket } from '../contexts/Basket.context';

export const useCreateShipment = () => {
	const { basket, setBasket } = UseBasket() as IBasketContext;
	const [dataError, setDataError] = useState<string | null>(null);
	const [token, setToken] = useState<string | null>(null);
	const [makeRequest, setMakeRequest] = useState<boolean>(false);

	const createShipment = (token: string | null) => {
		setToken(token);
	};

	useEffect(() => {
		if (!makeRequest && basket && token) {
			axios
				.post<IBasket>(
					`${shopAPI}/baskets/${basket.basket_id}/shipments`,
					{
						shipment_id: 'StandardShipping',
					},
					{
						headers: {
							Authorization: token,
						},
					}
				)
				.then((res) => {
                    setBasket(res.data)
                    setMakeRequest(true)
				}).catch(err => {
                    setDataError(err.message)
                });
		}
	}, [basket, makeRequest, setBasket, token]);

	return { createShipment, dataError };
};
