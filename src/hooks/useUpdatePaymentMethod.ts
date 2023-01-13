import axios from 'axios';
import { useEffect, useState } from 'react';

import { shopAPI } from '../config/httpConfig';

import { IBasket } from '@basket-types';
import { UseBasket } from '../contexts/Basket.context';
import { IBasketContext } from '@context-types';
import { ICardPayload } from '@payment-types';

export const useUpdatePaymentMethod = () => {
	const { basket, setBasket } = UseBasket() as IBasketContext;
	const [dataError, setDataError] = useState<string | null>(null);
	const [card, setCard] = useState<ICardPayload | null>(null);
	const [token, setToken] = useState<string | null>(null);

	const makeUpdateRequest = (tokenData: string | null, data: ICardPayload) => {
		if (tokenData) {
			setToken(tokenData);
		}
		if (data) {	
			setCard(data);
		}
	};

	useEffect(() => {
		if (token && basket && card) {
			axios
				.post<IBasket>(
					`${shopAPI}/baskets/${basket.basket_id}/payment_instruments`,
					{
						amount: basket.product_total,
						payment_card: { ...card },
						payment_method_id: 'CREDIT_CARD',
					},
					{
						headers: {
							Authorization: token,
						},
					}
				)
				.then((res) => {
					setBasket(res.data);
					setCard(null)
				})
				.catch((err) => {
					setDataError(err.message);
				});
		}
	}, [basket, card, setBasket, token]);

	return { makeUpdateRequest, dataError };
};
