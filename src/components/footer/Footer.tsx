import { Box, Flex } from '@chakra-ui/react';


export const Footer = () => {
	return (
		<Flex
			as='div'
			width='90%'
			height='10vh'
			margin='0 auto'
			align='center'
			justify='space-between'
			bg='gray.500'
            color='white'>
			<Box>Item 1</Box>
			<Box>Item 2</Box>
			<Box>Item 3</Box>
			<Box>Item 4</Box>
		</Flex>
	);
};
