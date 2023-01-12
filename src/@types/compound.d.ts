declare module '@compound-types' {
    interface ImageModel {
        link: string;
        alt: string;
		title: string;
        attribute: string | null
        value: string | null;
    }

    interface BasketItem {
        product_id: string;
        quantity: number;
    }
}