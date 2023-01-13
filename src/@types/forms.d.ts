declare module '@form-types' {
    interface IAddressForm {
        email: string;
        firstName: string;
        lastName: string;
        address: string;
        country: string;
        state: string;
        city: string;
        zip: string;
        phone: string;
    }

    interface ICard {
        holder: string;
        card_type: string;
        number: string;
        security_code: string;
        expiration: string;
        expiration_year: string;
    }

    interface IShipmentMethodForm {
        method: string;
    }

    interface IPaymentForm {
        method: string;
        card: string;
        cardHolder: string;
        cardNumber: string;
        month: string;
        year: string;
        cvv: string;
    }
}