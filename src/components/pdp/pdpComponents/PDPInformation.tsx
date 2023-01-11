import { IPDPInformation } from '@component-types';
import { Box } from '@chakra-ui/react';

export const PDPInformation: React.FC<IPDPInformation> = ({
	masterData,
}): JSX.Element => {
	return (
		<>
			{masterData && (
				<>
					<Box>ID: {masterData.id}</Box>
					<Box>Name: {masterData.name}</Box>
					<Box width='60%'>Description: {masterData.long_description}</Box>
					<Box>Price: {masterData.price} {masterData.currency}</Box>
				</>
			)}
		</>
	);
};
