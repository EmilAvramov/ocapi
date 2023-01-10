import { Flex, Button, FormControl, Input } from '@chakra-ui/react';
import { ISearch } from '@component-types';
import { SyntheticEvent, useState } from 'react';

export const Search: React.FC<ISearch> = ({search}): JSX.Element => {
	const [searchString, setSearchString] = useState<string>('');

	const submitForm = (e: SyntheticEvent) => {
		e.preventDefault();
		search(searchString)
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
							onChange={(e) => setSearchString(e.currentTarget.value)}
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
