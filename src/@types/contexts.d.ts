declare module '@context-types' {
	import { BasketItem } from '@compound-types'
    interface CartChildren {
		children: React.ReactNode;
	}

	interface ICartContext {
		items: BasketItem[] | [];
		count: number;
		setNewItem: React.Dispatch<React.SetStateAction<BasketItem | null>>
	}

	interface AuthChildren {
		children: React.ReactNode;
	}

	interface IAuthContext {
		token: string | null;
		tokenType: string | null;
		customerID: string | null;
		authError: string | null;
		changeTokenType: (value: string) => void;
	}
}