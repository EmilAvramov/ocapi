import { ContextChildren, IBasketContext } from '@context-types';
import { createContext, useContext, useEffect, useState } from 'react';

const BasketContext = createContext<IBasketContext | null>(null);

export const UseBasket = () => useContext(BasketContext);

export const BasketProvider: React.FC<ContextChildren> = ({ children }) => {

	return (
		<typeof BasketContext.Provider>
		
		</BasketContext.Provider>
	)
};
