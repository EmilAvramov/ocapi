import { Routes, Route } from 'react-router-dom';

import { Cart } from './cart/Cart';
import { Checkout } from './checkout/Checkout';
import { Main } from './pdp/Main';

import { Footer } from './footer/Footer';
import { Header } from './header/Header';
import { NotFound } from './helpers/NotFound';
import { useAuth } from '../hooks/useAuth';

const Router = () => {
	const { token } = useAuth();

	return (
		<>
			<Header />
			<Routes>
				<Route path='/' element={<Main token={token}/>}></Route>
				<Route path='checkout' element={<Checkout token={token}/>}></Route>
				<Route path='cart' element={<Cart />}></Route>
                <Route path='*' element={<NotFound error={''}/>}></Route>
			</Routes>
			<Footer />
		</>
	);
};

export default Router;