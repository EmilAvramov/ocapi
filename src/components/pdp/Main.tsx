import { IMain } from '@component-types';
import { useEffect } from 'react';
import { useGetPaymentMethods } from '../../hooks/useGetPaymentMethods';
import { useGetProduct } from '../../hooks/useGetProduct';
import { NotFound } from '../helpers/NotFound';
import { PDP } from './PDP';
import { Search } from './Search';

export const Main: React.FC<IMain> = ({ token }): JSX.Element => {
	const { dataSet, dataError, loading, setId } = useGetProduct();
	const { getMethods } = useGetPaymentMethods()

	const updateID = (id: string) => {
		setId(id);
	};

	useEffect(() => {
		getMethods(token)
	}, [])

	return (
		<>
			<Search search={updateID} />
			{dataError ? (
				<NotFound error={dataError} />
			) : (
				<PDP
					productData={dataSet}
					loading={loading}
					token={token}
				/>
			)}
		</>
	);
};
