declare module '@compound-types' {
    import { ICard } from "@form-types";
    interface IImageModel {
        link: string;
        alt: string;
		title: string;
        attribute: string | null
        value: string | null;
    }

    interface IBasketItem {
        product_id: string;
        quantity: number;
    }

    interface IAddress {
        first_name: string;
        last_name: string;
        full_name: string;
        country_code: string;
        state_code: string;
        city: string;
        address1: string;
        phone: string;
        postal_code: string;
    }

    interface IPayment {
        amount: number;
        payment_card: ICard;
        payment_method_id: string;
    }
}