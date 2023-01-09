import { Text, Flex } from '@chakra-ui/react';

export const Search = () => {
	return (
		<Flex
			as='div'
			width='90%'
			minHeight='10vh'
			margin='0 auto'
			align='center'
			justify='center'
			bg='lightGreen'>
			<Text>Search Area</Text>
		</Flex>
	);
};
