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
					`${proxy}${shopAPI}/products/${productID}/images?all_images=true&view_type=large&client_id=${clientID}`
				)
				.then(({ data }) => {
					setDataSet(data);
					setLoading(false)
				})
				.catch((err: any) => {
					setDataError(err);
					setLoading(false)
				});
		}
	}, [productID]);

	return { dataSet, dataError, loading, setId };
};
