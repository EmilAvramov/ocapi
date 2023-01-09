import { Box, Flex } from '@chakra-ui/react';

export const PDP = () => {
	return (
		<Flex
			as='div'
			flexDirection={'column'}
			width='90%'
			minHeight='70vh'
			margin='0 auto'
			align='center'
			justify='center'
			bg='whitesmoke'>
			<Box>Item 1</Box>
			<Box>Item 2</Box>
			<Box>Item 3</Box>
			<Box>Item 4</Box>
		</Flex>
	);
};
