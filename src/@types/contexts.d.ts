declare module '@context-types' {
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
		count: number;
	}
}
