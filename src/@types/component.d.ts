declare module '@component-types' {
	interface IPDP {
		productData: IData | null;
		dataError: string | null;
		loading: boolean;
	}

	interface ISearch {
		search: (id:string) => void
	}

	interface IData {
		_type: string;
		_v: string;
		c_color: string;
		c_refinementColor: string;
		c_size: string;
		c_width: string;
		id: string;
		long_description: string;
		min_order_quantity: number;
		name: string;
		page_description: string;
		page_title: string;
		short_description: string;
		step_quantity: 1;
		type: {
			_type: string;
			variant: boolean;
		};
		unit_measure: string;
		unit_quantity: number;
		upc: string;
		image_groups: ImageGroup[];
	}

	interface ImageGroup {
		_type: string;
		images: Image[];
		view_type: string;
		variation_attributes: null | VariationAttribute[]
	}

	interface Image {
		_type: string;
		alt: string;
		dis_base_link: string;
		link: string;
		title: string;
	}

	interface VariationAttribute {
		_type: string;
		id: string;
		values: Value[]
	}

	interface Value {
		_type: string;
		value: string;
	}
}
