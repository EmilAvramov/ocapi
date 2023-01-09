import { IData } from '@component-types';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { clientID, shopAPI } from '../config/httpConfig';

const proxy = 'https://proxy.cors.sh/'

const useGetProduct = () => {
	const [productID, setProductId] = useState<string>('');
	const [data, setData] = useState<IData | null>(null);
	const [dataError, setDataError] = useState<string | null>(null);

	const setId = (id: string) => {
		setProductId(id);
	};

	useEffect(() => {
		if (productID) {
			axios
				.get(
					`${proxy}${shopAPI}/products/${productID}/images?all_images=true&client_id=${clientID}`,
					{
						headers: {
							'access-control-allow-origin': clientID,
							'content-type': 'text/plain',
						},
					}
				)
				.then((data: any) => {
					setData(data.data);
				})
				.catch((err: any) => {
					setDataError(err);
				});
		}
	}, [productID]);

	return { data, dataError, setId };
};

export { useGetProduct };
