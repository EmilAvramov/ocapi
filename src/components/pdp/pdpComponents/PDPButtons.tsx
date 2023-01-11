import { Flex, Button } from '@chakra-ui/react';
import { IPDPButtons } from '@component-types';
import { BasketItem } from '@compound-types';
import { ICartContext } from '@context-types';
import { useState } from 'react';
import { UseCart } from '../../../contexts/Cart.context';

export const PDPButtons: React.FC<IPDPButtons> = ({
	masterData,
	quantity,
	color,
	size,
}): JSX.Element => {
	const { count, setNewItem } = UseCart() as ICartContext;
	const [product, setProduct] = useState<BasketItem | null>(null);

	const addItemToCart = (newProduct: BasketItem) => {
		masterData?.variants.forEach((variant) => {
			if (variant.orderable) {
				if (
					variant.variation_values.color === color &&
					variant.variation_values.size === size
				) {
					newProduct.id = variant.product_id;
				}
			}
		});
		setProduct(product);
		if (newProduct.id !== '' && newProduct.quantity !== 0) {
			setNewItem(newProduct);
			setProduct(null)
		}
	};

	return (
		<Flex
			as='div'
			gap='30px'>
			<Button
				marginTop='2%'
				onClick={() => addItemToCart({id: '', quantity})}
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
