import { useEffect, useState } from 'react';

import { Box, Button, Flex, Image as CImage } from '@chakra-ui/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';

import { IPDP } from '@component-types';
import { ImageGroup, IProduct } from '@product-types';
import { ImageModel } from '@compound-types';

import 'swiper/css';
import 'swiper/css/navigation';
import styles from './PDP.module.scss';
import { UseCart } from '../../contexts/Cart.context';

export const PDP: React.FC<IPDP> = ({ productData, loading }): JSX.Element => {
	const [quantity, setQuantity] = useState<number>(0);
	const [variantColor, setVariantColor] = useState<string | null>(null);
	const [variantSize, setVariantSize] = useState<string | null>(null);
	const [allCarouselImages, setallCarouselImages] = useState<
		ImageModel[] | null
	>(null);
	const [swatchImageData, setSwatchImageData] = useState<ImageModel[] | null>(
		null
	);
	const { addItem, count } = UseCart();

	useEffect(() => {
		let carouselImages: ImageModel[] = [];
		let swatchImages: ImageModel[] = [];
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
		setallCarouselImages(carouselImages);
		setSwatchImageData(swatchImages);
	}, [productData]);

	const addItemToCart = () => {
		if (productData) {
			const product: IProduct = productData;
			product.unit_quantity = quantity;
			addItem(product);
		}
	};

	const increaseQuantity = () => {
		if (quantity !== 10 && productData?.step_quantity) {
			setQuantity((prev) => prev + productData.step_quantity);
		}
	};

	const decreaseQuantity = () => {
		if (quantity !== 0 && productData?.step_quantity) {
			setQuantity((prev) => prev - productData.step_quantity);
		}
	};

	const checkAttributeAvailable = (
		type: string,
		value: string | null
	): boolean => {
		let exists: boolean = false;
		productData?.variation_attributes.forEach((attribute) => {
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

	const changeColor = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
		if (e.currentTarget.dataset.value) {
			setVariantColor(e.currentTarget.dataset.value);
		}
	};

	const changeSize = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		if (e.currentTarget.dataset.value) {
			setVariantSize(e.currentTarget.dataset.value);
		}
	};

	const carouselImages = allCarouselImages
		?.filter((image) => image.value === variantColor)
		.map((image, index) => (
			<SwiperSlide key={index}>
				<img
					src={image.link}
					alt={image.alt}
					title={image.title}
					data-value={image.value}
				/>
			</SwiperSlide>
		));

	const swatchImages = swatchImageData?.map((image, index) => (
		<CImage
			key={index}
			src={image.link}
			alt={image.alt}
			title={image.title}
			data-value={image.value}
			onClick={
				checkAttributeAvailable('color', image.value) === true
					? (e) => changeColor(e)
					: undefined
			}
		/>
	));

	const sizes = productData?.variation_attributes.forEach(
		(attribute) => {
			if (attribute.id === 'size') {
				attribute.values.map((size) => (
					<Button
						data-value={size.value}
						onClick={size.orderable ? (e) => changeSize(e) : undefined}>
						{size.name}
					</Button>
				));
			}
		}
	);

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
							{carouselImages}
						</Swiper>
					</Box>

					<Box
						as='div'
						flexBasis='100%'>
						<Flex
							flexDirection='column'
							gap='30px'
							justifyContent='center'>
							<Flex>{swatchImages}</Flex>
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
								<Box>{sizes}</Box>
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
