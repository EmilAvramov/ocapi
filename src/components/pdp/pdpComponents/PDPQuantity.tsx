import { Flex, Button, Box } from "@chakra-ui/react";
import { IPDPQuantity } from "@component-types";

export const PDPQuantity: React.FC<IPDPQuantity> = ({masterData, quantity, setQuantity}): JSX.Element => {
    
	const increaseQuantity = () => {
		if (quantity !== 10 && masterData?.step_quantity) {
			setQuantity((prev) => prev + masterData.step_quantity);
		}
	};

	const decreaseQuantity = () => {
		if (quantity !== 0 && masterData?.step_quantity) {
			setQuantity((prev) => prev - masterData.step_quantity);
		}
	};

	return (
		<Flex gap='10px'>
			<Box>Product Quantity:</Box>
			<Button
				size='xs'
				onClick={decreaseQuantity}>
				-
			</Button>
			<Box>{quantity}</Box>
			<Button
				size='xs'
				onClick={increaseQuantity}>
				+
			</Button>
		</Flex>
	);
};
