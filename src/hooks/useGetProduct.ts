import axios from 'axios';
import { useEffect, useState } from 'react';
import { clientID, shopAPI } from '../config/httpConfig';

const useGetProduct = () => {
	const [productID, setProductId] = useState<string>('');
	const [data, setData] = useState<any>(null);
	const [dataError, setDataError] = useState<string | null>(null);

	const setId = (id: string) => {
		setProductId(id);
	};

	useEffect(() => {
		if (productID) {
			axios
				.get(`${shopAPI}/products/${productID}?client_id=${clientID}`, {
					headers: {
						'Access-Control-Allow-Origin': '*',
						'content-type': 'application/json',
					},
				})
				.then((data: any) => {
					console.log(data);
					setData(data);
				})
				.catch((err: any) => {
					setDataError(err);
				});
		}
	}, [productID]);

	return { data, dataError, setId };
};

export { useGetProduct };
