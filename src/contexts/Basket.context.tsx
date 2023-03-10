import { IBasket } from '@basket-types';
import { IBasketItem } from '@compound-types';
import { ContextChildren, IBasketContext } from '@context-types';
import { createContext, useContext, useEffect, useState } from 'react';

const BasketContext = createContext<IBasketContext | null>(null);

export const UseBasket = () => useContext(BasketContext);

export const BasketProvider: React.FC<ContextChildren> = ({ children }) => {
	const [basket, setBasket] = useState<IBasket | null>(null);
	const [basketItems, setBasketItems] = useState<IBasketItem[] | null>(null);
	const [count, setCount] = useState<number>(0);

	console.log(basket)

	useEffect(() => {
		if (basket && basket.product_items) {
			setCount(basket.product_items.length)
		}
	}, [basket])

	return (
		<BasketContext.Provider value={{ basket,  setBasket, count, basketItems, setBasketItems }}>
			{children}
		</BasketContext.Provider>
	);
};
