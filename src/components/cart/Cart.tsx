import { Box, Flex } from '@chakra-ui/react';

export const Cart: React.FC = ():JSX.Element => {
	return (
		<Flex
			as='div'
			flexDirection={'column'}
			width='90%'
            minHeight='80vh'
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
