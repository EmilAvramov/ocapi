import { IBasket } from '@basket-types';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { clientID, proxy, shopAPI } from '../config/httpConfig';
import { useAuth } from './useAuth';

export const useBasket = () => {
	const { token } = useAuth();
	const [dataSets, setDataSet] = useState<any | null>(null);

	useEffect(() => {
		if (token) {
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
					console.log(res);
					setDataSet(res.data);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}, [token]);

	return { dataSets };
};
