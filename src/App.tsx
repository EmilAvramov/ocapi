import { BrowserRouter } from 'react-router-dom';
import Router from './components/Router';
import { ChakraProvider } from '@chakra-ui/react';
import { AuthProvider } from './contexts/Auth.context';
import { BasketProvider } from './contexts/Basket.context';

const App = () => {
	return (
		<BrowserRouter>
			<ChakraProvider>
				<AuthProvider>
					<BasketProvider>
						<Router />
					</BasketProvider>
				</AuthProvider>
			</ChakraProvider>
		</BrowserRouter>
	);
};

export default App;
