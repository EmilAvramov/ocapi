import { Flex, Box, Button } from '@chakra-ui/react';
import { ICheckoutConfirm } from '@component-types';
import { useCreateOrder } from '../../hooks/useCreateOrder';
import { useGetConfirmContent } from '../../hooks/useGetConfirmContent';
import DOMPurity from 'dompurify';
import parse from 'html-react-parser';
import { UseBasket } from '../../contexts/Basket.context';
import { IBasketContext } from '@context-types';

export const CheckoutConfirm: React.FC<ICheckoutConfirm> = ({
	token,
	basket,
}): JSX.Element => {
	const { makeCreateRequest, order, dataError } = useCreateOrder();
	const { dataSet, setId } = useGetConfirmContent();
	const { setBasket } = UseBasket() as IBasketContext;

	const submitOrder = () => {
		makeCreateRequest(token);
		setTimeout(() => {
			if (!dataError) {
				setId('order_confirm');
				setBasket(null);
			}
		}, 1000);
	};

	const confirm = () => {
		if (order) {
			let cleanHTML = DOMPurity.sanitize(dataSet.c_body, {
				USE_PROFILES: { html: true },
			});
			cleanHTML = cleanHTML.replace('{order}', `#${order.order_no}`);
			const html = parse(cleanHTML, {
				trim: true,
			});
			return html;
		}
		return null;
	};

	console.log(order);

	return (
		<>
			{!order ? (
				<Flex
					as='div'
					flexDirection={'column'}
					width='90%'
					minHeight='80vh'
					margin='0 auto'
					align='center'
					justify='center'
					bg='whitesmoke'>
					<Button onClick={submitOrder}>Confirm Order and Pay</Button>
				</Flex>
			) : (
				<Flex
					as='div'
					flexDirection={'column'}
					width='90%'
					minHeight='80vh'
					margin='0 auto'
					align='center'
					justify='center'
					bg='whitesmoke'>
					<Box>{dataSet && confirm()}</Box>
				</Flex>
			)}
		</>
	);
};
