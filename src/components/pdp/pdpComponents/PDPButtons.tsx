import { Flex, Button } from '@chakra-ui/react';
import { IPDPButtons } from '@component-types';
import { IBasketItem } from '@compound-types';
import { IBasketContext } from '@context-types';
import { useNavigate } from 'react-router-dom';
import { UseBasket } from '../../../contexts/Basket.context';
import { useCreateBasket } from '../../../hooks/useCreateBasket';
import { useUpdateBasket } from '../../../hooks/useUpdateBasket';

export const PDPButtons: React.FC<IPDPButtons> = ({
	masterData,
	quantity,
	color,
	size,
	token,
}): JSX.Element => {
	const { basket, count } = UseBasket() as IBasketContext;
	const { makeCreateRequest } = useCreateBasket();
	const { makeUpdateRequest } = useUpdateBasket();
	const navigate = useNavigate()

	const addItemToCart = (newProduct: IBasketItem) => {
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
		if (!basket) {
			makeCreateRequest(token);
		}
		if (
			newProduct &&
			newProduct.product_id !== '' &&
			newProduct.quantity !== 0
		) {
			makeUpdateRequest(token, [newProduct]);
		}
	};

	const checkout = () => {
		navigate('/checkout')
	}

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
				onClick={checkout}
				display={count === 0 ? 'none' : 'block'}
				disabled={count === 0 ? true : false}>
				Checkout
			</Button>
		</Flex>
	);
};
