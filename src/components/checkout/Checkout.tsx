import { ICheckout } from '@component-types';
import { useGetShipmentMethods } from '../../hooks/useGetShipmentMethods';
import { UseBasket } from '../../contexts/Basket.context';
import { IBasketContext } from '@context-types';
import { CheckoutAddress } from './CheckoutAddress';
import { CheckoutMethods } from './CheckoutMethods';
import { useEffect, useState } from 'react';
import { Flex, Button } from '@chakra-ui/react';

export const Checkout: React.FC<ICheckout> = ({ token }): JSX.Element => {
	const { basket } = UseBasket() as IBasketContext;
	const { methods, getMethods } = useGetShipmentMethods();
	const [checkoutStarted, setCheckoutStarted] = useState<boolean>(false);
	const [addressVisible, setAddressVisible] = useState<boolean>(false);
	const [methodsVisible, setMethodsVisible] = useState<boolean>(false);
	const [paymentsVisible, setPaymentsVisible] = useState<boolean>(false);

	const beginCheckout = () => {
		setCheckoutStarted(true);
		setAddressVisible(true);
	};

	const changeAddressState = (value: boolean) => {
		setAddressVisible(value);
	};

	const changeMethodsState = (value: boolean) => {
		setMethodsVisible(value);
	};

	const changePaymentsState = (value: boolean) => {
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
					nextState={changeMethodsState}
				/>
			)}
			{methodsVisible && (
				<CheckoutMethods
					token={token}
					ownState={changeAddressState}
					nextState={changeMethodsState}
					methods={methods}
					getMethods={getMethods}
				/>
			)}
		</>
	);
};
