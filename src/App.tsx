import { BrowserRouter } from 'react-router-dom';
import Router from './components/Router';
import { ChakraProvider } from '@chakra-ui/react';
import { CartProvider } from './contexts/Cart.context';

const App = () => {
	return (
		<BrowserRouter>
			<ChakraProvider>
				<CartProvider>
					<Router />
				</CartProvider>
			</ChakraProvider>
		</BrowserRouter>
	);
};

export default App;
