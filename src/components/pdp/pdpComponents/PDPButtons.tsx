import { Flex, Button } from '@chakra-ui/react';
import { IPDPButtons } from '@component-types';
import { BasketItem } from '@compound-types';
import { useState } from 'react';
import { UseCart } from '../../../contexts/Cart.context';

export const PDPButtons: React.FC<IPDPButtons> = ({
	masterData,
	quantity,
	color,
	size,
}): JSX.Element => {
	const { addItem, count } = UseCart();
	const [product, setProduct] = useState<BasketItem>({ id: '', quantity: 0 });

	const addItemToCart = () => {
		masterData?.variants.forEach((variant) => {
			if (variant.orderable) {
				if (
					variant.variation_values.color === color &&
					variant.variation_values.size === size
				) {
					product.id = variant.product_id;
					product.quantity = quantity;
				}
			}
		});
		setProduct(product);
		if (product.id !== '' && product.quantity !== 0) {
			addItem(product);
		}
	};

	return (
		<Flex
			as='div'
			gap='30px'>
			<Button
				marginTop='2%'
				onClick={addItemToCart}
				disabled={quantity === 0 || color === null || size === null}>
				Add to Cart
			</Button>
			<Button
				marginTop='2%'
				display={count === 0 ? 'none' : 'block'}
				disabled={quantity === 0 || color === null || size === null}>
				Checkout
			</Button>
		</Flex>
	);
};
