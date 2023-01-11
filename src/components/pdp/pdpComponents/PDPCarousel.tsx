import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';

import styles from './PDPCarousel.module.scss'
import 'swiper/css';
import 'swiper/css/navigation';

import { IPDPCarousel } from '@component-types';

export const PDPCarousel: React.FC<IPDPCarousel> = ({color, images}): JSX.Element => {

	const carouselImages = images
		?.filter((image) => image.value === color)
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
	return (
		<Swiper
			modules={[Navigation]}
			slidesPerView={1}
			navigation={true}
			className={styles['swiper__container']}>
			{carouselImages}
		</Swiper>
	);
};
