import { IPDPInformation } from '@component-types';
import { Box } from '@chakra-ui/react';

export const PDPInformation: React.FC<IPDPInformation> = ({
	masterData,
}): JSX.Element => {
	return (
		<>
			{masterData && (
				<>
					<Box>Product ID: {masterData.id}</Box>
					<Box>Product Name: {masterData.name}</Box>
					<Box>
						Product Price: {masterData.price} {masterData.currency}
					</Box>
				</>
			)}
		</>
	);
};
