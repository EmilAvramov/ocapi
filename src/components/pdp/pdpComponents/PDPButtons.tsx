import { Flex, Button } from '@chakra-ui/react';
import { IPDPButtons } from '@component-types';
import { IProduct } from '@product-types';
import { UseCart } from '../../../contexts/Cart.context';

export const PDPButtons: React.FC<IPDPButtons> = ({
	masterData,
	quantity,
	color,
	size
}): JSX.Element => {
	const { addItem, count } = UseCart();

	const addItemToCart = () => {
		let product;
		masterData?.variants.forEach(variant => {
			if (variant.orderable) {
				if (variant.variation_values.color === color && variant.variation_values.size === size) {
					product.id = variant.product_id
					product.quantity = quantity
				}
			}
		})

		addItem(product);
	};

	console.log(color, size)

	return (
		<Flex
			as='div'
			gap='30px'>
			<Button
				marginTop='2%'
				onClick={addItemToCart}
				disabled={quantity === 0}>
				Add to Cart
			</Button>
			<Button
				marginTop='2%'
				display={count === 0 ? 'none' : 'block'}
				disabled={quantity === 0}>
				Checkout
			</Button>
		</Flex>
	);
};
