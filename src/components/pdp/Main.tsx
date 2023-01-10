import { useGetProduct } from '../../hooks/useGetProduct';
import { PDP } from './PDP';
import { Search } from './Search';

export const Main = () => {
	const { dataSet, dataError, loading, setId } = useGetProduct();

	const updateID = (id:string) => {
		setId(id)
	}

	return (
		<>
			<Search search={updateID}/>
			<PDP
				productData={dataSet}
				dataError={dataError}
				loading={loading}
			/>
		</>
	);
};
