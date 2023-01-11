declare module '@basket-types' {
	interface IBasket {
		_flash: {};
		_resource_state: string;
		_type: string;
		_v: string;
		adjusted_merchandize_total_tax: number;
		adjusted_shipping_total_tax: number;
		agent_basket: boolean;
		basket_id: string;
		channel_type: string;
		creation_date: string;
		currency: string;
		customer_info: {
			_type: string;
			customer_id: string;
			email: string;
		};
		last_modified: string;
		merchandize_total_tax: number;
		notes: {
			_type: string;
			link: string;
		};
		order_total: number;
		product_sub_tota: number;
		product_total: number;
		shipments: IShipment[];
		shipping_items: IShippingItems[];
		shipping_total: number;
		shipping_total_tax: number;
		tax_total: number;
		taxation: string;
	}

	interface IShipment {
		_type: string;
		adjusted_merchandize_total_tax: number;
		adjusted_shipping_total_tax: number;
		gift: boolean;
		merchandize_total_tax: number;
		product_sub_total: number;
		product_total: number;
		shipment_id: string;
		shipment_total: number;
		shipping_status: string;
		shipping_total: number;
		shipping_total_tax: number;
		tax_total: number;
	}

	interface IShippingItems {
		_type: string;
		adjusted_tax: number;
		base_price: number;
		item_id: string;
		item_text: string;
		price: number;
		price_after_item_discount: number;
		shipment_id: string;
		tax: number;
		tax_basis: number;
		tax_class_id: number;
		tax_rate: number;
	}
}
