import { Flex, Image } from '@chakra-ui/react';
import { IPDPSwatches } from '@component-types';

export const PDPSwatches: React.FC<IPDPSwatches> = ({
	color,
	setColor,
	masterData,
	swatches,
}): JSX.Element => {
	const changeColor = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
		if (e.currentTarget.dataset.value) {
			setColor(e.currentTarget.dataset.value);
		}
	};

	const checkAttributeAvailable = (
		type: string,
		value: string | null
	): boolean => {
		let exists: boolean = false;
		masterData?.variation_attributes?.forEach((attribute) => {
			if (attribute.id === type) {
				attribute.values.forEach((item) => {
					if (item.value === value && item.orderable) {
						exists = true;
					}
				});
			}
		});
		if (exists) {
			return true;
		}
		return false;
	};

	const swatchImages = swatches?.map((image, index) => (
		<Image
			key={index}
			src={image.link}
			alt={image.alt}
			title={image.title}
			data-value={image.value}
			borderRadius='full'
			boxSize='50px'
			border={color === image.value ? 'dashed' : 'none'}
			onClick={
				checkAttributeAvailable('color', image.value) === true
					? (e) => changeColor(e)
					: undefined
			}
		/>
	));

	return <Flex gap='10px'>{swatchImages}</Flex>;
};
