import { useGetProduct } from '../../hooks/useGetProduct';
import { NotFound } from '../helpers/NotFound';
import { PDP } from './PDP';
import { Search } from './Search';

export const Main: React.FC = (): JSX.Element => {
	const { dataSet, dataError, loading, setId } = useGetProduct();

	const updateID = (id: string) => {
		setId(id);
	};

	return (
		<>
			<Search search={updateID} />
			{dataError ? (
				<NotFound error={dataError} />
			) : (
				<PDP
					productData={dataSet}
					loading={loading}
				/>
			)}
		</>
	);
};
