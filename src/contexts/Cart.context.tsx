import { BasketItem } from '@compound-types';
import { CartChildren, ICartContext } from '@context-types';
import { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext<ICartContext | null>(null);

export const UseCart = () => useContext(CartContext);

export const CartProvider: React.FC<CartChildren> = ({ children }) => {
	const [items, setItem] = useState<BasketItem[] | []>([]);
	const [count, setCount] = useState<number>(0);

	const addItem = (item: BasketItem) => {
		console.log(item)
		setItem((oldData: BasketItem[]) => [item, ...oldData]);
	};

	useEffect(() => {
		setCount(items?.length);
		console.log(items)
	}, [items]);

	return (
		<CartContext.Provider value={{ items, count, addItem }}>
			{children}
		</CartContext.Provider>
	);
};
