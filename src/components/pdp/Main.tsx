import { useGetProduct } from '../../hooks/useGetProduct';
import { PDP } from './PDP';
import { Search } from './Search';

export const Main = () => {

	const { data, dataError } = useGetProduct();

	return (
		<>
			<Search />
			<PDP productData={data} dataError={dataError}/>
		</>
	);
};
