import { Box, List, ListItem, Heading, Flex, Button } from '@chakra-ui/react';
import { ICartContext } from '@context-types';
import { Link } from 'react-router-dom';
import { UseCart } from '../../contexts/Cart.context';

export const Header = () => {
	const { count } = UseCart() as ICartContext;;

	return (
		<Flex
			as='nav'
			margin='0 auto'
			align='center'
			justify='space-between'
			width='90%'
			height='10vh'
			wrap='wrap'
			padding={6}
			bg='gray.500'
			color='white'>
			<Flex
				align='center'
				mr={5}>
				<Heading
					as='h1'
					size='lg'
					letterSpacing='tighter'>
					<Link to='/'>Demo StoreFront</Link>
				</Heading>
			</Flex>

			<List
				width={{ base: 'full', md: 'auto' }}
				alignItems='center'
				mt={{ base: 4, md: 0 }}
				display='flex'
				gap='30px'>
				<ListItem>
					<Link to='/'>PDP</Link>
				</ListItem>
				<ListItem>
					<Link to='/cart'>Cart</Link>
				</ListItem>
			</List>

			<Box mt={{ base: 4, md: 0 }}>
				<Button
					variant='outline'
					_hover={{ bg: 'teal.700', borderColor: 'teal.700' }}>
					<i
						className='fa fa-shopping-bag'
						aria-hidden='true'></i>
					<Box
						as='div'
						position='absolute'
						right='0'
						top='0'
						color='black'>
						{count}
					</Box>
				</Button>
			</Box>
		</Flex>
	);
};
