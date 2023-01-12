import { Flex, FormControl, Input, Button, Select } from '@chakra-ui/react';

export const Checkout: React.FC = (): JSX.Element => {
	const states = [
		'Alabama',
		'Alaska',
		'Arizona',
		'Arkansas',
		'California',
		'Colorado',
		'Connecticut',
		'Delaware',
		'Florida',
		'Georgia',
		'Hawaii',
		'Idaho',
		'Illinois',
		'Indiana',
		'Iowa',
		'Kansas',
		'Kentucky',
		'Louisiana',
		'Maine',
		'Maryland',
		'Massachusetts',
		'Michigan',
		'Minnesota',
		'Mississippi',
		'Missouri',
		'Montana',
		'Nebraska',
		'Nevada',
		'New Hampshire',
		'New Jersey',
		'New Mexico',
		'New York',
		'North Carolina',
		'North Dakota',
		'Ohio',
		'Oklahoma',
		'Oregon',
		'Pennsylvania',
		'Rhode Island',
		'South Carolina',
		'South Dakota',
		'Tennessee',
		'Texas',
		'Utah',
		'Vermont',
		'Virginia',
		'Washington',
		'West Virginia',
		'Wisconsin',
		'Wyoming',
		'Non-US/Other',
	];

	const renderOptions = states.map((state) => (
		<option value={state}>{state}</option>
	));

	return (
		<Flex
			flexDirection='row'
			align='center'
			justifyContent='center'
            minHeight='79vh'>
			<form>
				<Flex
					gap='15px'
					direction='column'>
					<FormControl flexBasis='75%'>
						<Input
							flexBasis='80%'
							type='email'
							placeholder='Email Address'
						/>
					</FormControl>
					<FormControl flexBasis='75%'>
						<Input
							flexBasis='80%'
							type='text'
							placeholder='First Name'
						/>
					</FormControl>
					<FormControl flexBasis='75%'>
						<Input
							flexBasis='80%'
							type='text'
							placeholder='Last Name'
						/>
					</FormControl>
					<FormControl flexBasis='75%'>
						<Input
							flexBasis='80%'
							type='text'
							placeholder='Address'
						/>
					</FormControl>
					<FormControl flexBasis='75%'>
						<Select
							flexBasis='80%'
							placeholder='Select Country'>
							<option value='USA'>United States</option>
						</Select>
					</FormControl>
					<FormControl flexBasis='75%'>
						<Select
							flexBasis='80%'
							placeholder='Select State'>
							{renderOptions}
						</Select>
					</FormControl>
					<FormControl flexBasis='75%'>
						<Input
							flexBasis='80%'
							type='text'
							placeholder='City'
						/>
					</FormControl>
					<FormControl flexBasis='75%'>
						<Input
							flexBasis='80%'
							type='number'
							placeholder='ZIP Code'
						/>
					</FormControl>
					<FormControl flexBasis='75%'>
						<Input
							flexBasis='80%'
							type='tel'
							placeholder='Phone Number'
						/>
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
