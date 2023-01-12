import { useEffect, useState } from 'react';

import { Box, Flex } from '@chakra-ui/react';

import { IPDP } from '@component-types';
import { ImageGroup, ValuesVAP } from '@product-types';
import { ImageModel } from '@compound-types';

import 'swiper/css';
import 'swiper/css/navigation';
import { PDPCarousel } from './pdpComponents/PDPCarousel';
import { PDPSwatches } from './pdpComponents/PDPSwatches';
import { PDPSizes } from './pdpComponents/PDPSizes';
import { PDPQuantity } from './pdpComponents/PDPQuantity';
import { PDPButtons } from './pdpComponents/PDPButtons';
import { PDPInformation } from './pdpComponents/PDPInformation';

export const PDP: React.FC<IPDP> = ({ productData, loading, token }): JSX.Element => {
	const [quantity, setQuantity] = useState<number>(0);
	const [variantColor, setVariantColor] = useState<string | null>(null);
	const [variantSize, setVariantSize] = useState<string | null>(null);
	const [sizeData, setSizeData] = useState<ValuesVAP[] | null>(null);
	const [allCarouselImages, setallCarouselImages] = useState<ImageModel[] | null>(null);
	const [swatchImageData, setSwatchImageData] = useState<ImageModel[] | null>(null);

	useEffect(() => {
		let carouselImages: ImageModel[] = [];
		let swatchImages: ImageModel[] = [];
		let sizeData: ValuesVAP[] = [];

		productData?.image_groups?.forEach((group: ImageGroup) => {
			if (group.view_type === 'large' || group.view_type === 'swatch') {
				group.images.forEach((image) => {
					let dataImage: ImageModel = {
						link: image.link,
						alt: image.alt,
						title: image.title,
						attribute: group.variation_attributes
							? group.variation_attributes[0].id
							: null,
						value: group.variation_attributes
							? group.variation_attributes[0].values[0].value
							: null,
					};
					if (group.view_type === 'large') {
						carouselImages.push(dataImage);
					} else {
						swatchImages.push(dataImage);
					}
				});
			}
		});

		productData?.variation_attributes?.forEach((attribute) => {
			if (attribute.id === 'size') {
				attribute.values.forEach((value) => sizeData.push(value));
			}
		});

		setallCarouselImages(carouselImages);
		setSwatchImageData(swatchImages);
		setSizeData(sizeData);
		setQuantity(0)
	}, [productData]);

	console.log(allCarouselImages)

	return (
		<>
			{productData && (
				<Flex
					gap='50px'
					marginTop='5%'
					marginBottom='5%'>
					<Box
						as='div'
						flexBasis='100%'>
						<PDPCarousel color={variantColor} images={allCarouselImages}/>
					</Box>

					<Box
						as='div'
						flexBasis='100%'>
						<Flex
							flexDirection='column'
							gap='30px'
							justifyContent='center'>
							<PDPInformation masterData={productData}/>
							<PDPSwatches masterData={productData} color={variantColor} swatches={swatchImageData} setColor={setVariantColor}/>
							<PDPSizes sizeData={sizeData} size={variantSize} setSize={setVariantSize}/>
							<PDPQuantity masterData={productData} setQuantity={setQuantity} quantity={quantity}/>
						</Flex>
						<PDPButtons masterData={productData} quantity={quantity} color={variantColor} size={variantSize} token={token}/>
					</Box>
				</Flex>
			)}
		</>
	);
};
