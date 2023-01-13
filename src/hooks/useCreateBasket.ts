import axios from 'axios';
import { useEffect, useState } from 'react';

import { clientID, shopAPI } from '../config/httpConfig';
import { UseBasket } from '../contexts/Basket.context';

import { IBasket } from '@basket-types';
import { IBasketContext } from '@context-types';

export const useCreateBasket = () => {
    const { setBasket } = UseBasket() as IBasketContext
	const [token, setToken] = useState<string | null>(null);
	const [dataError, setDataError] = useState<string | null>(null);
    const [created, setCreated] = useState<boolean>(false);

	const makeCreateRequest = (token: string | null) => {
		setToken(token)
	}

	useEffect(() => {
		if (token && !created) {
			axios
				.post<IBasket>(
					`${shopAPI}/baskets?${clientID}`,
					{},
					{
						headers: {
							Authorization: token,
						},
					}
				)
				.then((res) => {
					setBasket(res.data);
					setCreated(true)
				})
				.catch((err) => {
					setDataError(err.message);
				});
		}
	}, [created, setBasket, token]);

	return { makeCreateRequest, dataError };
};
