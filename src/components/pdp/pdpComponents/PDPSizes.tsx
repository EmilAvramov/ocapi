import { Button, Box } from '@chakra-ui/react';
import { IPDPSizes } from '@component-types';

export const PDPSizes: React.FC<IPDPSizes> = ({
	size,
	sizeData,
	setSize,
}): JSX.Element => {
	const changeSize = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		if (e.currentTarget.dataset.value) {
			setSize(e.currentTarget.dataset.value);
		}
	};

	const sizes = sizeData?.map((sizeElement, index) => (
		<Button
			key={index}
			data-value={sizeElement.value}
			variant={size === sizeElement.value ? 'solid' : 'outline'}
			onClick={sizeElement.orderable ? (e) => changeSize(e) : undefined}>
			{sizeElement.name}
		</Button>
	));

	return <>{sizes?.length !== 0 && <Box>{sizes}</Box>}</>;
};
