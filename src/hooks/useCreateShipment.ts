import { IBasket } from '@basket-types';
import { IBasketContext } from '@context-types';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { shopAPI, clientID } from '../config/httpConfig';
import { UseBasket } from '../contexts/Basket.context';

export const useCreateShipment = () => {
	const { basket, setBasket } = UseBasket() as IBasketContext;
	const [dataError, setDataError] = useState<string | null>(null);
	const [token, setToken] = useState<string | null>(null);
	const [makeRequest, setMakeRequest] = useState<boolean>(false);

	const createShipment = (token: string | null) => {
        console.log(token)
        console.log(makeRequest)
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
                    setMakeRequest(true)
					console.log(res.data);
				});
		}
	}, [basket, makeRequest, token]);

	return { createShipment, dataError };
};
