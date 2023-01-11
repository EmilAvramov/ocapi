import { BasketItem } from '@compound-types';
import { CartChildren, ICartContext } from '@context-types';
import { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext<ICartContext | null>(null);

export const UseCart = () => useContext(CartContext);

export const CartProvider: React.FC<CartChildren> = ({ children }) => {
	const [items, setItems] = useState<BasketItem[] | []>([]);
	const [count, setCount] = useState<number>(0);
	const [newItem, setNewItem] = useState<BasketItem | null>(null)

	useEffect(() => {
		if (newItem) {
			setItems(prev => {
				if (items.filter(item => item.id === newItem.id).length > 0) {
					items.filter(item => {
						if (item.id === newItem.id) {
							item.quantity += newItem.quantity
						}
						return item
					})
					return items
				} else {
					return [...prev, newItem]
				}
			})
			setNewItem(null)
		}
		setCount(items?.length);
		console.log(items)
	}, [items, newItem]);

	return (
		<CartContext.Provider value={{ items, count, setNewItem }}>
			{children}
		</CartContext.Provider>
	);
};
