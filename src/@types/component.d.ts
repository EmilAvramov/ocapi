declare module '@component-types' {
	import { IProduct } from "@product-types";
	import { ImageModel } from '@compound-types'

	interface IMain {
		token: string | null;
	}
	interface IPDP {
		productData: IProduct | null;
		loading: boolean;
		token: string | null;
	}

	interface ISearch {
		search: (id: string) => void;
	}

	interface IError {
		error: string;
	}

	interface IPDPCarousel {
		color: string | null;
		images: ImageModel[] | null;
	}

	interface IPDPSwatches {
		color: string | null;
		swatches: ImageModel[] | null;
		masterData: IProduct | null;
		setColor: React.Dispatch<React.SetStateAction<string | null>>
	}

	interface IPDPSizes {
		size: string | null;
		sizeData: ValuesVAP[] | null;
		setSize: React.Dispatch<React.SetStateAction<string | null>>;
	}

	interface IPDPQuantity {
		masterData: IProduct | null;
		quantity: number;
		setQuantity: React.Dispatch<React.SetStateAction<number>>;
	}

	interface IPDPButtons {
		masterData: IProduct | null;
		quantity: number;
		size: string | null;
		color: string | null;
		token: string | null;
	}

	interface IPDPInformation {
		masterData: IProduct | null;
	}

	interface ICheckout {
		token: string | null;
	}

	interface ICheckoutAddress {
		token: string | null;
		ownState: (value: boolean) => void;
		nextState: (value: boolean) => void;
	}
}
