declare module '@product-types' {
	// Master
	interface IProduct {
		_type: string;
		_v: string;
		c_color: string;
		c_refinementColor: string;
		c_size: string;
		c_width: string;
		currency: string;
		id: string;
		image_groups: ImageGroup[];
		long_description: string;
		master: {
			_type: string;
			link: string;
			master_id: string;
			orderable: boolean;
			price: number;
		}
		min_order_quantity: number;
		name: string;
		page_description: string;
		page_title: string;
		price: number;
		price_per_unit: number;
		product_promotions: Promotion[]
		short_description: string;
		step_quantity: 1;
		type: {
			_type: string;
			variant: boolean;
			bundle: boolean;
			set: boolean;
			item: boolean;
		};
		unit_measure: string;
		unit_quantity: number;
		upc: string;
		variants: Variant[]
		variation_attributes: VariationAttributeProduct[]
		variation_values: {
			color: string;
			size: string;
		}
	}

	// Images
	interface ImageGroup {
		_type: string;
		images: Image[];
		view_type: string;
		variation_attributes: null | VariationAttributeImage[];
	}

	interface Image {
		_type: string;
		alt: string;
		dis_base_link: string;
		link: string;
		title: string;
	}

	interface VariationAttributeImage {
		_type: string;
		id: string;
		values: ValuesVAI[];
	}

	interface ValuesVAI {
		_type: string;
		value: string;
	}

	// Promotion
	interface Promotion {
		_type: string;
		callout_msg: string;
		link: string;
		promotion_id: string;
	}

	// Variant
	interface Variant {
		_type: string;
		link: string;
		orderable: boolean;
		price: number;
		product_id: string;
		variation_values: {
			color: string;
			size: string;
		}
	}

	// Variation Attributes
	interface VariationAttributeProduct {
		_type: string;
		id: string;
		name: string;
		values: ValuesVAP[]
	}

	interface ValuesVAP {
		_type: string;
		name: string;
		orderable: boolean;
		value: string;
	}
}