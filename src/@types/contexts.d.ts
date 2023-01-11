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
}