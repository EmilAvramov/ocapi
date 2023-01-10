declare module '@component-types' {
	import { IProduct } from "@product-types";
	interface IPDP {
		productData: IProduct | null;
		loading: boolean;
	}

	interface ISearch {
		search: (id: string) => void;
	}

	interface IError {
		error: string;
	}


}
