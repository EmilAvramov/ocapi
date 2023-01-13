declare module '@shipment-types' {
    interface IShipmenthData {
        _v: string;
        _type: string;
        applicable_shipping_methods: IShippingMethod[];
        default_shipping_method: string
    }

    interface IShippingMethod {
        _type: string;
        description: string;
        id: string;
        name: string;
        price: number;
        c_estimatedArrivalTime: string;
    }
}