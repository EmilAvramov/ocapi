import axios from 'axios';
import { useEffect, useState } from 'react';
import { proxy, shopAPI } from '../config/httpConfig';

export const useGetContent = () => {
	const [contentID, setContentID] = useState<string | null>('links');
	const [dataSet, setDataSet] = useState<any | null>(null);
	const [dataError, setDataError] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(false);

	const setId = (id: string) => {
		setContentID(id);
	};

	useEffect(() => {
		if (contentID) {
			setLoading(true);
			axios
				.get(
					`${proxy}${shopAPI}/content/${contentID}?client_id=aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa`
				)
				.then((res) => {
					setDataSet(res.data);
					setDataError('');
					setLoading(false);
				})
				.catch((err) => {
					setDataError(err);
					setLoading(false);
				});
		}
	}, [contentID]);

	return { dataSet, dataError, loading, setId };
};
