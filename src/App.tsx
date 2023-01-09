import { BrowserRouter } from 'react-router-dom';
import Router from './components/Router';
import { ChakraProvider } from '@chakra-ui/react';

const App = () => {
	return (
		<BrowserRouter>
			<ChakraProvider>
				<Router />
			</ChakraProvider>
		</BrowserRouter>
	);
};

export default App;
