import { Flex, Button, FormControl, Input } from '@chakra-ui/react';
import { SyntheticEvent, useState } from 'react';
import { useGetProduct } from '../../hooks/useGetProduct';

export const Search: React.FC = (): JSX.Element => {
	const { setId } = useGetProduct();
	const [search, setSearch] = useState<string>('');

	const submitForm = (e: SyntheticEvent) => {
		e.preventDefault();
		setId(search);
	};

	return (
		<Flex
			flexDirection='row'
			align='center'
			justifyContent='center'>
			<form onSubmit={submitForm}>
				<Flex gap='15px'>
					<FormControl flexBasis='75%'>
						<Input
							flexBasis='80%'
							type='text'
							placeholder='Enter product ID'
							onChange={(e) => setSearch(e.currentTarget.value)}
						/>
					</FormControl>
					<Button
						flexBasis='25%'
						width='full'
						type='submit'>
						Search
					</Button>
				</Flex>
			</form>
		</Flex>
	);
};
