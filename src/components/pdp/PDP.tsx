import { Image as ImageI, IPDP } from '@component-types';
import { FC, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import styles from './pdp.module.scss';

export const PDP: FC<IPDP> = ({
	productData,
	dataError,
	loading,
}): JSX.Element => {
	const [imageData, setImageData] = useState<ImageI[] | null>(null);

	useEffect(() => {
		let images: ImageI[] = [];
		productData?.image_groups.forEach((group) => {
			if (group.variation_attributes) {
				group.images.forEach((image) => {
					images.push(image);
				});
			}
		});
		setImageData(images);
	}, [productData]);

	console.log(productData);

	return (
		<>
			{productData && (
				<div className={styles.swiper__container}>
					<Swiper
						modules={[Navigation]}
						slidesPerView={1}
						navigation={true}>
						{imageData?.map((image, index) => (
							<SwiperSlide key={index}>
								<img
									src={image.link}
									alt={image.alt}
								/>
							</SwiperSlide>
						))}
					</Swiper>
				</div>
			)}
		</>
	);
};
