import { ICheckout } from '@component-types';
import { useGetShippingMethods } from '../../hooks/useGetShippingMethods';
import { UseBasket } from '../../contexts/Basket.context';
import { IBasketContext } from '@context-types';
import { CheckoutAddress } from './CheckoutAddress';
import { CheckoutShipping } from './CheckoutShipping';
import { Flex, Button } from '@chakra-ui/react';
import { useGetPaymentMethods } from '../../hooks/useGetPaymentMethods';
import { CheckoutPayment } from './CheckoutPayment';
import { useState } from 'react';

export const Checkout: React.FC<ICheckout> = ({ token }): JSX.Element => {
	const { basket } = UseBasket() as IBasketContext;
	const { shippingMethods, getShippingMethods } = useGetShippingMethods();
	const { paymentMethods, getPaymentMethods } = useGetPaymentMethods();
	const [checkoutStarted, setCheckoutStarted] = useState<boolean>(false);
	const [addressVisible, setAddressVisible] = useState<boolean>(false);
	const [shippingVisible, setShippingVisible] = useState<boolean>(false);
	const [paymentsVisible, setPaymentsVisible] = useState<boolean>(false);

	const beginCheckout = () => {
		setCheckoutStarted(true);
		setAddressVisible(true);
	};

	const changeAddressState = (value: boolean) => {
		setAddressVisible(value);
	};

	const changeShippingState = (value: boolean) => {
		getShippingMethods(token);
		setShippingVisible(value);
	};

	const changePaymentsState = (value: boolean) => {
		getPaymentMethods(token)
		setPaymentsVisible(value);
	};

	return (
		<>
			{!checkoutStarted && (
				<Flex
					as='div'
					flexDirection={'column'}
					width='90%'
					minHeight='80vh'
					margin='0 auto'
					align='center'
					justify='center'
					bg='whitesmoke'>
					<Button onClick={beginCheckout}>Start Checkout</Button>
				</Flex>
			)}
			{addressVisible && (
				<CheckoutAddress
					token={token}
					ownState={changeAddressState}
					nextState={changeShippingState}
				/>
			)}
			{shippingVisible && (
				<CheckoutShipping
					token={token}
					ownState={changeShippingState}
					nextState={changePaymentsState}
					methods={shippingMethods}
				/>
			)}
			{paymentsVisible && (
				<CheckoutPayment
					token={token}
					ownState={changePaymentsState}
					nextState={changePaymentsState}
					methods={paymentMethods}
				/>
			)}
		</>
	);
};
