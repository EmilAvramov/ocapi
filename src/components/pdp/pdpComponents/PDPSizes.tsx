import { Button, Box } from '@chakra-ui/react';
import { IPDPSizes } from '@component-types';

export const PDPSizes: React.FC<IPDPSizes> = ({
	sizeData,
	setSize,
}): JSX.Element => {
	const changeSize = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		if (e.currentTarget.dataset.value) {
			setSize(e.currentTarget.dataset.value);
		}
	};

	const sizes = sizeData?.map((size, index) => (
		<Button
			key={index}
			data-value={size.value}
			onClick={size.orderable ? (e) => changeSize(e) : undefined}>
			{size.name}
		</Button>
	));

	return <>{sizes?.length !== 0 && <Box>{sizes}</Box>}</>;
};
