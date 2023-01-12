import axios from 'axios';
import { useEffect, useState } from 'react';

import { proxy, shopAPI } from '../config/httpConfig';

import { IBasket } from '@basket-types';
import { UseBasket } from '../contexts/Basket.context';
import { IBasketContext } from '@context-types';
import { IBasketItem } from '@compound-types';

export const useUpdateBasket = () => {
    const { basket, setBasket } = UseBasket() as IBasketContext
	const [dataError, setDataError] = useState<string | null>(null);
    const [itemsToAdd, setItemsToAdd] = useState<IBasketItem[] | null>(null);
    const [token, setToken] = useState<string | null>(null);

    const makeUpdateRequest = (tokenData: string | null, data: IBasketItem[]) => {
        if (tokenData) {
            setToken(tokenData)
        }
        setItemsToAdd(data)
    }

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

	return { makeUpdateRequest, dataError };
};
