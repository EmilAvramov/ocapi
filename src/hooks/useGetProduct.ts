import { IProduct } from '@product-types';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { clientID, shopAPI } from '../config/httpConfig';

const proxy = 'https://corsproxy.io/?';

export const useGetProduct = () => {
	const [productID, setProductId] = useState<string>('');
	const [dataSet, setDataSet] = useState<IProduct | null>(null);
	const [dataError, setDataError] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(false);

	const setId = (id: string) => {
		setProductId(id);
	};

	useEffect(() => {
		if (productID) {
			setLoading(true)
			axios
				.get<IProduct>(
					`${proxy}${shopAPI}/products/${productID}?expand=prices%2Cvariations%2Cimages%2Cavailability%2Coptions%2Cbundled_products%2Cpromotions&all_images=true&client_id=${clientID}`
				)
				.then((res) => {
					console.log(res.data)
					setDataSet(res.data);
					setDataError('')
					setLoading(false)
				})
				.catch((err) => {
					if (err.response.status === 404) {
						setDataError(`No product with ID ${productID} could be found.`);
					} else {
						setDataError(`Something went wrong, please try again. Status code: ${err.response.status}`)
					}
					
					setLoading(false)
				});
		}
	}, [productID]);

	return { dataSet, dataError, loading, setId };
};
