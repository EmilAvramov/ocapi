import { CartChildren } from '@context-types';
import { IProduct } from '@product-types';
import { createContext, useContext, useEffect, useState } from 'react';

const useValue = () => {
	const [items, setItem] = useState<IProduct[] | []>([]);
	const [count, setCount] = useState<number>(0);

	const addItem = (item: IProduct) => {
		setItem((items) => [...items, item]);
	};

	useEffect(() => {
		setCount(items?.length);
	}, [items]);

    return { items, count, addItem}
}

const CartContext = createContext({} as ReturnType<typeof useValue>);

export const UseCart = () => useContext(CartContext);

export const CartProvider: React.FC<CartChildren> = ({ children }) => {
	const [items, setItem] = useState<IProduct[] | []>([]);
	const [count, setCount] = useState<number>(0);

	const addItem = (item: IProduct) => {
		setItem((items) => [...items, item]);
	};

	useEffect(() => {
		setCount(items?.length);
	}, [items]);

	return (
		<CartContext.Provider value={{ items, count, addItem }}>
			{children}
		</CartContext.Provider>
	);
};
