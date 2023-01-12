import { ContextChildren, ICartContext } from '@context-types';
import { createContext, useContext, useEffect, useState } from 'react';
import { useBasket } from '../hooks/useBasket';

const CartContext = createContext<ICartContext | null>(null);

export const UseCart = () => useContext(CartContext);

export const CartProvider: React.FC<ContextChildren> = ({ children }) => {
	const { basket } = useBasket()
	const [count, setCount] = useState<number>(0);

	useEffect(() => {
		if (basket && basket.product_items) {
			setCount(basket.product_items.length)
		}
	}, [basket]);

	return (
		<CartContext.Provider value={{ count }}>
			{children}
		</CartContext.Provider>
	);
};
