import { useEffect, useState } from 'react';

import { Box, Button, Flex } from '@chakra-ui/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';

import { IPDP } from '@component-types';
import { Image, ImageGroup, IProduct } from '@product-types';

import 'swiper/css';
import 'swiper/css/navigation';
import styles from './PDP.module.scss';
import { UseCart } from '../../contexts/Cart.context';

export const PDP: React.FC<IPDP> = ({ productData, loading }): JSX.Element => {
	const [quantity, setQuantity] = useState<number>(0);
	const [imageData, setImageData] = useState<Image[] | null>(null);
	const { addItem, count } = UseCart();

	useEffect(() => {
		let images: Image[] = [];
		productData?.image_groups?.forEach((group: ImageGroup) => {
			if (productData.type.variant && productData.type.variant === true) {
				if (group.view_type === 'large' && group.variation_attributes) {
					group.images.forEach((image) => images.push(image));
				}
			} else {
				if (group.view_type === 'large') {
					group.images.forEach((image) => images.push(image));
				}
			}
		});
		setImageData(images);
	}, [productData]);

	const addItemToCart = () => {
		const product: IProduct = productData;
		product.unit_quantity = quantity;
		addItem(product);
	};

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
						<Flex
							as='div'
							gap='30px'>
							<Button
								marginTop='2%'
								onClick={addItemToCart}
								disabled={quantity === 0}>
								Add to Cart
							</Button>
							<Button
								marginTop='2%'
								display={count === 0 ? 'none' : 'block'}
								disabled={quantity === 0}>
								Checkout
							</Button>
						</Flex>
					</Box>
				</Flex>
			)}
		</>
	);
};
