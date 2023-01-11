declare module '@compound-types' {
    interface ImageModel {
        link: string;
        alt: string;
		title: string;
        attribute: string | null
        value: string | null;
    }

    interface BasketItem {
        id: string;
        quantity: number;
    }
}