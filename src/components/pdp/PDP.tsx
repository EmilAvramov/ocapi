import { Box, Flex, Image } from '@chakra-ui/react';
import { Image as ImageI, IPDP } from '@component-types';
import { FC, useEffect, useState } from 'react';

export const PDP: FC<IPDP> = ({ productData, dataError }): JSX.Element => {
	const [imageData, setImageData] = useState<ImageI[] | null>(null);
	
	useEffect(() => {
		let images: ImageI[] = []
		productData?.image_groups.forEach((group) => {
			group.images.forEach(image => {
				console.log(image)
				images.push(image)
			})
		})
		setImageData(images)
	}, [productData])

	const renderImages = () => {
		return imageData?.map((image, index) => (
			<Image
				key={index}
				src={image.link}
				alt={image.alt}></Image>
		));
	};
	return (
		<>
			{productData && (
				<Flex
					as='div'
					flexDirection='column'
					width='90%'
					minHeight='70vh'
					margin='0 auto'
					align='center'
					justify='center'
					bg='whitesmoke'>
					<Box>{productData.name}</Box>
					<Box>{productData.id}</Box>
					<>
						{renderImages()}
					</>
				</Flex>
			)}
		</>
	);
};
