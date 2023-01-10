import { IData } from '@component-types';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { clientID, shopAPI } from '../config/httpConfig';

const proxy = 'https://corsproxy.io/?';

export const useGetProduct = () => {
	const [productID, setProductId] = useState<string>('');
	const [dataSet, setDataSet] = useState<IData | null>(null);
	const [dataError, setDataError] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(false);

	const setId = (id: string) => {
		setProductId(id);
	};

	useEffect(() => {
		if (productID) {
			setLoading(true)
			axios
				.get<IData>(
					`${proxy}${shopAPI}/products/${productID}?all_images=true&expand=prices%2Cimages&client_id=${clientID}`
				)
				.then((res) => {
					console.log(res)
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
