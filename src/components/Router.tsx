import { Routes, Route } from 'react-router-dom';

import { Cart } from './cart/Cart';
import { Checkout } from './checkout/Checkout';
import { Main } from './pdp/Main';

import { Footer } from './footer/Footer';
import { Header } from './header/Header';
import { NotFound } from './helpers/NotFound';
import { useAuth } from '../hooks/useAuth';
import { CheckoutAddress } from './checkout/CheckoutAddress';
import { CheckoutMethods } from './checkout/CheckoutMethods';

const Router = () => {
	const { token } = useAuth();

	return (
		<>
			<Header />
			<Routes>
				<Route
					path='/'
					element={<Main token={token} />}></Route>
				<Route
					path='checkout'
					element={<Checkout token={token} />}>
					<Route
						path='address'
						element={
							<CheckoutAddress
								token={token}
								ownState={function (value: boolean): void {
									throw new Error('Function not implemented.');
								}}
								nextState={function (value: boolean): void {
									throw new Error('Function not implemented.');
								}}
							/>
						}></Route>
					<Route
						path='methods'
						element={
							<CheckoutMethods
								token={null}
								ownState={function (value: boolean): void {
									throw new Error('Function not implemented.');
								}}
								nextState={function (value: boolean): void {
									throw new Error('Function not implemented.');
								}}
								methods={null}
							/>
						}></Route>
				</Route>
				<Route
					path='cart'
					element={<Cart />}></Route>
				<Route
					path='*'
					element={<NotFound error={''} />}></Route>
			</Routes>
			<Footer />
		</>
	);
};

export default Router;
