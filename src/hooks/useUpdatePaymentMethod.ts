import axios from 'axios';
import { useEffect, useState } from 'react';

import { proxy, shopAPI } from '../config/httpConfig';

import { IBasket } from '@basket-types';
import { UseBasket } from '../contexts/Basket.context';
import { IBasketContext } from '@context-types';
import { ICard } from '@form-types';

export const useUpdatePaymentMethod = () => {
	const { basket, setBasket } = UseBasket() as IBasketContext;
	const [dataError, setDataError] = useState<string | null>(null);
	const [card, setCard] = useState<ICard | null>(null);
	const [token, setToken] = useState<string | null>(null);

	const makeUpdateRequest = (tokenData: string | null, data: ICard) => {
		if (tokenData) {
			setToken(tokenData);
		}
		if (data) {
			let formValues: ICard = {
				holder: data.holder,
				card_type: data.card_type,
				number: data.number,
				security_code: data.security_code,
				expiration: data.expiration,
				expiration_year: data.expiration_year,
			};	
			setCard(formValues);
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
				})
				.catch((err) => {
					setDataError(err.message);
				});
		}
	}, [basket, card, setBasket, token]);

	return { makeUpdateRequest, dataError };
};
