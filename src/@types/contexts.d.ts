declare module '@context-types' {
	import { IBasket } from '@basket-types';
	import { BasketItem } from '@compound-types';
	interface ContextChildren {
		children: React.ReactNode;
	}

	interface ICartContext {
		count: number;
	}

	interface IAuthContext {
		token: string | null;
		tokenType: string | null;
		customerID: string | null;
		authError: string | null;
		changeTokenType: (value: string) => void;
	}

	interface IBasketContext {
		basket: IBasket | null;
		setBasket: React.Dispatch<React.SetStateAction<IBasket | null>>;
		basketItems: BasketItem[] | null;
		setBasketItems: React.Dispatch<React.SetStateAction<BasketItem[] | null>>;
		count: number;
	}
}
