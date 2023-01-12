import { Flex, Button } from '@chakra-ui/react';
import { IPDPButtons } from '@component-types';
import { BasketItem } from '@compound-types';
import { ICartContext } from '@context-types';
import { useState } from 'react';
import { UseCart } from '../../../contexts/Cart.context';
import { useBasket } from '../../../hooks/useBasket';

export const PDPButtons: React.FC<IPDPButtons> = ({
	masterData,
	quantity,
	color,
	size,
}): JSX.Element => {
	const { count } = UseCart() as ICartContext;
	const [product, setProduct] = useState<BasketItem | null>(null);
	const { setBasketItems } = useBasket();

	const addItemToCart = (newProduct: BasketItem) => {
		masterData?.variants.forEach((variant) => {
			if (variant.orderable) {
				if (
					variant.variation_values.color === color &&
					variant.variation_values.size === size
				) {
					newProduct.product_id = variant.product_id;
				}
			}
		});
		setProduct(product);
		if (newProduct.product_id !== '' && newProduct.quantity !== 0) {
			setBasketItems([newProduct]);
			setProduct(null);
		}
	};

	return (
		<Flex
			as='div'
			gap='30px'>
			<Button
				marginTop='2%'
				onClick={() => addItemToCart({ product_id: '', quantity })}
				disabled={quantity === 0 || color === null || size === null}>
				Add to Cart
			</Button>
			<Button
				marginTop='2%'
				display={count === 0 ? 'none' : 'block'}
				disabled={count === 0 ? true : false}>
				Checkout
			</Button>
		</Flex>
	);
};
