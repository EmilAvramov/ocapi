import {
	Flex,
	FormControl,
	Input,
	Button,
	Select,
	Box,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { emailPattern, states } from '../../config/staticData';
import * as Yup from 'yup';
import { IAddressForm } from '@form-types';
import { yupResolver } from '@hookform/resolvers/yup';
import { useUpdateAddress } from '../../hooks/useUpdateAddress';
import { ICheckoutAddress } from '@component-types';

export const CheckoutAddress: React.FC<ICheckoutAddress> = ({ token, ownState, nextState }): JSX.Element => {
	const { makeUpdateRequest, dataError } = useUpdateAddress();

	const validationSchema = Yup.object().shape({
		email: Yup.string()
			.matches(emailPattern, { message: 'Enter a valid email' })
			.required('Field is required'),
		firstName: Yup.string().required('Field is required'),
		lastName: Yup.string().required('Field is required'),
		address: Yup.string().required('Field is required'),
		country: Yup.string().required('Field is required'),
		state: Yup.string().required('Field is required'),
		city: Yup.string().required('Field is required'),
		zip: Yup.string()
			.test('len', 'Must be 5 characters long', (val) => val?.length === 5)
			.required('Field is required'),
		phone: Yup.string()
			.test('len', 'Must be 10 characters long', (val) => val?.length === 10)
			.required('Field is required'),
	});

	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<IAddressForm>({
		resolver: yupResolver(validationSchema),
		mode: 'onBlur',
		reValidateMode: 'onChange',
	});

	const onSubmit = (data: IAddressForm) => {
		makeUpdateRequest(token, data);
        if (!dataError) {
            ownState(false) 
            nextState(true)
        }
        
	};

	const renderOptions = states.map((state, index) => (
		<option
			key={index}
			value={state}>
			{state}
		</option>
	));

	return (
		<Flex
			align='center'
			justifyContent='center'
			minHeight='79vh'
			direction='column'
			gap='50px'>
			<Box
				border='1px solid red'
				padding='5px'
				borderRadius='3px'>
				Shipping/Billing Address Details
			</Box>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Flex
					gap='15px'
					direction='column'>
					<FormControl flexBasis='75%'>
						<Input
							id='email'
							flexBasis='80%'
							type='email'
							placeholder='Email Address'
							{...register('email')}
						/>
						{errors.email && <Box>{errors.email.message}</Box>}
					</FormControl>
					<FormControl flexBasis='75%'>
						<Input
							id='firstName'
							flexBasis='80%'
							type='text'
							placeholder='First Name'
							{...register('firstName')}
						/>
						{errors.firstName && <Box>{errors.firstName.message}</Box>}
					</FormControl>
					<FormControl flexBasis='75%'>
						<Input
							id='lastName'
							flexBasis='80%'
							type='text'
							placeholder='Last Name'
							{...register('lastName')}
						/>
						{errors.lastName && <Box>{errors.lastName.message}</Box>}
					</FormControl>
					<FormControl flexBasis='75%'>
						<Input
							id='address'
							flexBasis='80%'
							type='text'
							placeholder='Address'
							{...register('address')}
						/>
						{errors.address && <Box>{errors.address.message}</Box>}
					</FormControl>
					<FormControl flexBasis='75%'>
						<Select
							id='country'
							flexBasis='80%'
							placeholder='Select Country'
							{...register('country')}>
							<option value='USA'>United States</option>
						</Select>
						{errors.country && <Box>{errors.country.message}</Box>}
					</FormControl>
					<FormControl flexBasis='75%'>
						<Select
							id='state'
							flexBasis='80%'
							placeholder='Select State'
							{...register('state')}>
							{renderOptions}
						</Select>
						{errors.state && <Box>{errors.state.message}</Box>}
					</FormControl>
					<FormControl flexBasis='75%'>
						<Input
							id='city'
							flexBasis='80%'
							type='text'
							placeholder='City'
							{...register('city')}
						/>
						{errors.city && <Box>{errors.city.message}</Box>}
					</FormControl>
					<FormControl flexBasis='75%'>
						<Input
							id='zip'
							flexBasis='80%'
							type='text'
							placeholder='ZIP Code'
							{...register('zip')}
						/>
						{errors.zip && <Box>{errors.zip.message}</Box>}
					</FormControl>
					<FormControl flexBasis='75%'>
						<Input
							id='phone'
							flexBasis='80%'
							type='text'
							placeholder='Phone Number'
							{...register('phone')}
						/>
						{errors.phone && <Box>{errors.phone.message}</Box>}
					</FormControl>
					<Button
						flexBasis='75%'
						lineHeight='5vh'
						type='submit'>
						Next
					</Button>
				</Flex>
			</form>
		</Flex>
	);
};
