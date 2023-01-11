import { BrowserRouter } from 'react-router-dom';
import Router from './components/Router';
import { ChakraProvider } from '@chakra-ui/react';
import { CartProvider } from './contexts/Cart.context';
import { AuthProvider } from './contexts/Auth.context';

const App = () => {
	return (
		<BrowserRouter>
			<ChakraProvider>
				<AuthProvider>
					<CartProvider>
						<Router />
					</CartProvider>
				</AuthProvider>
			</ChakraProvider>
		</BrowserRouter>
	);
};

export default App;
