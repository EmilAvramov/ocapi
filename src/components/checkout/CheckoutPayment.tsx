import {
	Box,
	Button,
	Flex,
	FormControl,
	Input,
	Select,
} from '@chakra-ui/react';
import { ICheckoutPayment } from '@component-types';
import { IPaymentForm, IShipmentMethodForm } from '@form-types';
import { yupResolver } from '@hookform/resolvers/yup';
import {
	IPaymentCard,
	IPaymentMethod,
	IPaymentMethodGroup,
} from '@payment-types';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

export const CheckoutPayment: React.FC<ICheckoutPayment> = ({
	token,
	ownState,
	nextState,
	methods,
}): JSX.Element => {
	const [paymentMethods, setPaymentMethods] =
		useState<IPaymentMethodGroup | null>(null);
	const [paymentMethod, setPaymentMethod] = useState<IPaymentMethod | null>(
		null
	);
	const [paymentCard, setPaymentCard] = useState<IPaymentCard | null>(null);

	useEffect(() => {
		setPaymentMethods(methods);
	}, [methods]);

	const validationSchema = Yup.object().shape({
		method: Yup.string().required('Selecting a method is required'),
		card: Yup.string().required('Selecting a card is required'),
		cardHolder: Yup.string().required('Please enter a name'),
		cardNumber: Yup.string().when('card', {
			is: 'Visa',
			then: Yup.string().length(Number(paymentCard?.number_lengths[0]), 'Enter a valid card number'),
		}),
		expiration: Yup.string().length(5, 'Enter a valid expiration date'),
		cvv: Yup.string().length(paymentCard ? paymentCard.security_code_length : 0, 'CVV length invalid')
	});

	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<IPaymentForm>({
		resolver: yupResolver(validationSchema),
		mode: 'onBlur',
		reValidateMode: 'onChange',
	});

	const renderMethods = paymentMethods?.applicable_payment_methods.map(
		(method, index) => (
			<option
				key={index}
				value={method.id}>
				{method.name}
			</option>
		)
	);

	const renderCards = paymentMethod?.cards.map((card, index) => (
		<option
			key={index}
			value={card.name}>
			{card.name}
		</option>
	));

	const selectMethod = (e: React.ChangeEvent<HTMLSelectElement>) => {
		if (paymentMethods) {
			setPaymentMethod(
				paymentMethods.applicable_payment_methods.filter(
					(method) => method.id === e.currentTarget.value
				)[0]
			);
		}
	};

	const selectCard = (e: React.ChangeEvent<HTMLSelectElement>) => {
		if (paymentMethod) {
			setPaymentCard(
				paymentMethod.cards.filter(
					(card) => card.name === e.currentTarget.value
				)[0]
			);
		}
	};

	const onSubmit = (data: any) => {
		console.log(data);
	};

	console.log(methods);
	return (
		<>
			<Flex
				align='center'
				justifyContent='center'
				minHeight='79vh'
				direction='column'
				gap='20px'>
				<Box>Please select a payment method</Box>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Flex
						align='center'
						justifyContent='center'
						direction='column'
						gap='20px'>
						<FormControl flexBasis='75%' display='flex' flexDirection='column' gap='20px'>
							<Select
								id='method'
								flexBasis='80%'
								placeholder='Select Method'
								{...register('method', {
									onChange: (e: React.ChangeEvent<HTMLSelectElement>) =>
										selectMethod(e),
								})}>
								{paymentMethods && renderMethods}
							</Select>
							{errors.method && <Box color='red'>{errors.method.message}</Box>}
							<Select
								id='card'
								flexBasis='80%'
								placeholder='Select Card'
								{...register('card', {
									onChange: (e: React.ChangeEvent<HTMLSelectElement>) =>
										selectCard(e),
								})}>
								{paymentMethod && renderCards}
							</Select>
							{errors.card && <Box color='red'>{errors.card.message}</Box>}
							{paymentCard && (
								<Flex
									direction='column'
									gap='15px'>
									<FormControl flexBasis='75%'>
										<Input
											id='cardHolder'
											flexBasis='80%'
											type='text'
											placeholder='Cardholder Name'
											{...register('cardHolder')}
										/>
										{errors.cardHolder && (
											<Box>{errors.cardHolder.message}</Box>
										)}
									</FormControl>
									<FormControl flexBasis='75%'>
										<Input
											id='cardNumber'
											flexBasis='80%'
											type='text'
											placeholder='Card Number'
											{...register('cardNumber')}
										/>
										{errors.cardNumber && (
											<Box>{errors.cardNumber.message}</Box>
										)}
									</FormControl>
									<Flex gap='10px'>
										<FormControl flexBasis='50%'>
											<Input
												id='expiration'
												flexBasis='80%'
												type='text'
												placeholder='Card Expiration'
												{...register('expiration')}
											/>
											{errors.expiration && (
												<Box>{errors.expiration.message}</Box>
											)}
										</FormControl>
										<FormControl flexBasis='50%'>
											<Input
												id='cvv'
												flexBasis='80%'
												type='text'
												placeholder='Card CVV'
												{...register('cvv')}
											/>
											{errors.cvv && <Box>{errors.cvv.message}</Box>}
										</FormControl>
									</Flex>
								</Flex>
							)}
						</FormControl>
						{errors.card && <Box color='red'>{errors.card.message}</Box>}
						<Button
							flexBasis='75%'
							lineHeight='5vh'
							type='submit'>
							Next
						</Button>
					</Flex>
				</form>
			</Flex>
			{/* {methods?.applicable_payment_methods.map((method, index) => (
				<>
					<Box key={index}>{method.name}</Box>
					<Box>{method.payment_processor_id}</Box>
					<Box>{method.id}</Box>
					<Box>{method._type}</Box>
					<Box>
						{method.cards?.map((card) => (
							<Box>{card.name}</Box>
						))}
					</Box>
				</>
			))} */}
		</>
	);
};
