import axios from 'axios';
import { useEffect, useState } from 'react';

import { proxy, shopAPI } from '../config/httpConfig';
import { useAuth } from './useAuth';

import { IBasket } from '@basket-types';
import { UseBasket } from '../contexts/Basket.context';
import { IBasketContext } from '@context-types';
import { BasketItem } from '@compound-types';

export const useUpdateBasketItems = () => {
	const { token } = useAuth();
    const { basket, setBasket } = UseBasket() as IBasketContext
	const [dataError, setDataError] = useState<string | null>(null);
    const [itemsToAdd, setItemsToAdd] = useState<BasketItem[] | null>(null);

	useEffect(() => {
		if (token && basket && itemsToAdd) {
			axios.post<IBasket>(
				`${proxy}${shopAPI}/baskets/${basket.basket_id}/items`,
				[...itemsToAdd],
				{
					headers: {
						Authorization: token,
					},
				}
			).then(res => {
				setBasket(res.data)
				setItemsToAdd(null)
			}).catch(err => {
				setDataError(err.message)
				setItemsToAdd(null)
			});
			
		}
	}, [basket, itemsToAdd, setBasket, token]);

	return { setItemsToAdd, dataError };
};
