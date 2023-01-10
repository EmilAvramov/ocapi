import { useEffect, useState } from 'react';

import { Box, Button, Flex } from '@chakra-ui/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';

import { IPDP } from '@component-types';
import { Image, ImageGroup } from '@data-types';

import 'swiper/css';
import 'swiper/css/navigation';
import styles from './PDP.module.scss';

export const PDP: React.FC<IPDP> = ({ productData, loading }): JSX.Element => {
	const [quantity, setQuantity] = useState<number>(0);
	const [imageData, setImageData] = useState<Image[] | null>(null);

	useEffect(() => {
		let images: Image[] = [];
		productData?.image_groups.forEach((group: ImageGroup) => {
			if (group.view_type === 'large' && group.variation_attributes) {
				group.images.forEach((image) => {
					images.push(image);
				});
			}
		});
		setImageData(images);
	}, [productData]);

	const increaseQuantity = () => {
		if (quantity !== 10) {
			setQuantity((prev) => prev + 1);
		}
	};

	const decreaseQuantity = () => {
		if (quantity !== 0) {
			setQuantity((prev) => prev - 1);
		}
	};

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
