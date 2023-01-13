declare module '@payment-types' {
    interface IPaymentMethodGroup {
        _type: string;
        _v : string;
        applicable_payment_methods: IPaymentMethod[];
    }

    interface IPaymentMethod {
        _type: string;
        cards: IPaymentCard[];
        id: string;
        name: string;
        payment_processor_id: string;
    }

    interface IPaymentCard {
        _type: string;
        card_type: string;
        checksum_verification_enabled: boolean;
        name: string;
        number_lengths: string[];
        number_prefixes: string[];
        security_code_length: number;
    }

    interface ICardPayload {
        number: string,
        security_code: string,
        holder: string,
        card_type: string,
        expiration_month: number,
        expiration_year: number
    }
}