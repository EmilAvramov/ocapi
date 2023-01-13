import { Box, Button, Flex, FormControl, Select } from '@chakra-ui/react';
import { ICheckoutMethods } from '@component-types';
import { IShipmentMethodForm } from '@form-types';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

export const CheckoutMethods: React.FC<ICheckoutMethods> = ({
	token,
	ownState,
	nextState,
	methods,
}): JSX.Element => {
	const validationSchema = Yup.object().shape({
		method: Yup.string().required('Selecting a method is required'),
	});

	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<IShipmentMethodForm>({
		resolver: yupResolver(validationSchema),
        mode: 'onSubmit',
		reValidateMode: 'onSubmit',
	});

	const onSubmit = (data: any) => {
		console.log(data);
		// makeUpdateRequest(token, data);
		// if (!dataError) {
		//     ownState(false)
		//     nextState(true)
		// }
	};

	const renderOptions = methods?.applicable_shipping_methods.map(
		(method, index) => (
			<option
				key={index}
				value={method.id}>
				{method.name} - {method.price} - {method.c_estimatedArrivalTime}
			</option>
		)
	);

	console.log(methods);
	return (
		<Flex
			align='center'
			justifyContent='center'
			minHeight='79vh'
			direction='column'
			gap='20px'>
			<Box>Please select a shipping method</Box>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Flex
					align='center'
					justifyContent='center'
					direction='column'
					gap='20px'>
					<FormControl flexBasis='75%'>
						<Select
							id='method'
							flexBasis='80%'
							placeholder='Select Method'
							{...register('method')}>
							{renderOptions}
						</Select>
					</FormControl>
					{errors.method && <Box color='red'>{errors.method.message}</Box>}
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
