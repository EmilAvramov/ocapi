declare module '@order_types' {
	interface IOrder {
		_resource_state: string;
		_type: string;
		_v: string;
		adjusted_merchandize_total_tax: number;
		adjusted_shipping_total_tax: number;
		billing_address: {
			_type: string;
			address1: string;
			city: string;
			country_code: string;
			first_name: string;
			full_name: string;
			id: string;
			last_name: string;
			phone: string;
			postal_code: string;
			state_code: string;
		};
		channel_type: string;
		confirmation_status: string;
		created_by: string;
		creation_date: string;
		currency: string;
		customer_info: {
			_type: string;
			customer_id: string;
			customer_name: string;
		};
		export_status: string;
		guest: boolean;
		last_modified: string;
		merchandize_total_tax: number;
		notes: {
			_type: string;
			link: string;
		};
		order_no: string;
		order_token: string;
		order_total: number;
		payment_instruments: [];
		payment_status: string;
		product_items: [];
		product_sub_total: number;
		product_total: number;
		shipments: [];
		shipping_items: [];
		shipping_status: string;
		shipping_total: string;
		shipping_total_tax: number;
		site_id: string;
		status: string;
		tax_total: number;
		taxation: string;
	}
}
