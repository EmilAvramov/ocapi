import { Image as ImageI, IPDP } from '@component-types';
import { FC, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import styles from './PDP.module.scss';
import { Box, Button, Flex } from '@chakra-ui/react';

export const PDP: FC<IPDP> = ({
	productData,
	dataError,
	loading,
}): JSX.Element => {
	const [quantity, setQuantity] = useState<number | undefined>(
		productData?.unit_quantity
	);
	const [imageData, setImageData] = useState<ImageI[] | null>(null);

	useEffect(() => {
		let images: ImageI[] = [];
		productData?.image_groups.forEach((group) => {
			if (group.view_type === 'large' && group.variation_attributes) {
				group.images.forEach((image) => {
					images.push(image);
				});
			}
		});
		setImageData(images);
		console.log(images);
	}, [productData]);

	const increaseQuantity = () => {
		if (quantity !== 10) {
			setQuantity((prev) => {
				if (prev) {
					prev++;
				}
				return prev
			});
		}
	};

	const decreaseQuantity = () => {
		if (quantity !== 0) {
			setQuantity((prev) => {
				if (prev) {
					prev--;
				}
				return prev
			});
		}
	};

	console.log(productData);

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
						<Swiper
							modules={[Navigation]}
							slidesPerView={1}
							navigation={true}
							className={styles['swiper__container']}>
							{imageData?.map((image, index) => (
								<SwiperSlide key={index}>
									<img
										src={image.link}
										alt={image.alt}
									/>
								</SwiperSlide>
							))}
						</Swiper>
					</Box>

					<Box
						as='div'
						flexBasis='100%'>
						<Flex
							flexDirection='column'
							gap='30px'
							justifyContent='center'>
							<Box>Product ID: {productData.id}</Box>
							<Box>Product Name: {productData.name}</Box>
							<Box>
								Product Price: {productData.price} {productData.currency}
							</Box>
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
						</Flex>
						<Button marginTop='2%'>Add to Cart</Button>
					</Box>
				</Flex>
			)}
		</>
	);
};
