import { Flex, Button } from '@chakra-ui/react';
import { IPDPButtons } from '@component-types';
import { BasketItem } from '@compound-types';
import { IBasketContext } from '@context-types';
import { useState } from 'react';
import { UseBasket } from '../../../contexts/Basket.context';
import { useCreateBasket } from '../../../hooks/useCreateBasket';
import { useUpdateBasketItems } from '../../../hooks/useUpdateBasketItems';

export const PDPButtons: React.FC<IPDPButtons> = ({
	masterData,
	quantity,
	color,
	size,
	token
}): JSX.Element => {
	const [product, setProduct] = useState<BasketItem | null>(null);
	const { basket } = UseBasket() as IBasketContext
	const { makeCreateRequest } = useCreateBasket()
	const { setItemsToAdd } = useUpdateBasketItems()

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
		setProduct(newProduct);
		if (!basket) {
			makeCreateRequest(token)
		}
		if (newProduct && newProduct.product_id !== '' && newProduct.quantity !== 0) {
			setItemsToAdd([newProduct])
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
				// display={0 === 0 ? 'none' : 'block'}
				// disabled={0 === 0 ? true : false}
				>
				Checkout
			</Button>
		</Flex>
	);
};
