import axios from 'axios';
import { useEffect, useState } from 'react';

import { clientID, proxy, shopAPI } from '../config/httpConfig';
import { useAuth } from './useAuth';

import { IBasket } from '@basket-types';
import { BasketItem } from '@compound-types';

export const useBasket = () => {
	const { token } = useAuth();
	const [basket, setBasket] = useState<IBasket | null>(null);
	const [basketItems, setBasketItems] = useState<BasketItem[] | null>(null);
	const [dataError, setDataError] = useState<string | null>(null);
	const [billingAddress, setBillingAddress] = useState<any>(null);
	const [shippingAddress, setShippingAddress] = useState<any>(null);
	const [shippingMethod, setShippingMethod] = useState<any>(null);
	const [productItems, setProductItems] = useState<BasketItem[] | null>(null);
	const [paymentMethod, setPaymentMethod] = useState<any>(null);

	console.log(basket);

	useEffect(() => {
		if (token && !basket) {
			axios
				.post<IBasket>(
					`${proxy}${shopAPI}/baskets?${clientID}`,
					{},
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
		if (token && basket && basketItems) {
			axios.post<IBasket>(
				`${proxy}${shopAPI}/baskets/${basket.basket_id}/items`,
				[...basketItems],
				{
					headers: {
						Authorization: token,
					},
				}
			).then(res => {
				setBasket(res.data)
				setBasketItems(null)
			}).catch(err => {
				setDataError(err.message)
				setBasketItems(null)
			});
			
		}
	}, [basket, basketItems, token]);

	return { basket, basketItems, dataError, setBasketItems };
};
