import { Routes, Route } from 'react-router-dom';

import { Cart } from './cart/Cart';
import { Checkout } from './checkout/Checkout';
import { Main } from './pdp/Main';

import { Footer } from './footer/Footer';
import { Header } from './header/Header';
import { NotFound } from './helpers/NotFound';

const Router = () => {
	return (
		<>
			<Header />
			<Routes>
				<Route path='/' element={<Main />}></Route>
				<Route path='checkout' element={<Checkout />}></Route>
				<Route path='cart' element={<Cart />}></Route>
                <Route path='*' element={<NotFound/>}></Route>
			</Routes>
			<Footer />
		</>
	);
};

export default Router;