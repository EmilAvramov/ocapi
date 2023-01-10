declare module '@component-types' {
	import { IData } from "@data-types";
	interface IPDP {
		productData: IData | null;
		loading: boolean;
	}

	interface ISearch {
		search: (id: string) => void;
	}

	interface IError {
		error: string;
	}


}
