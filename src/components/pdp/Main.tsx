import { useEffect } from 'react';
import { useGetProduct } from '../../hooks/useGetProduct';
import { PDP } from './PDP';
import { Search } from './Search';

export const Main = () => {
	const { data , setId } = useGetProduct()

	useEffect(() => {
		setId('008884303989M')
	}, [setId])

	console.log(data)

	return (
		<>
			<Search />
			<PDP />
		</>
	);
};
