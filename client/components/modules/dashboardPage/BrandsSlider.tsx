'use client';
import { useEffect } from "react";
import Slider from "react-slick";
import { useAppSelector } from "@/store";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import BrandSliderNextArrow from "@/components/elements/svg/BrandSliderNextArrow";
import BrandSliderPrevArrow from "@/components/elements/svg/BrandSliderPrevArrow";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from '@/styles/dashboard/index.module.scss'

const BrandsSlider = () => {
	const theme = useAppSelector(state => state.theme.theme)
	const darkModeClass = theme === 'dark' ? `${styles.dark_mode}` : '';
	const isMedia800 = useMediaQuery(800)
	const brandItems = [
		{ id: 1, img: '/img/brand1.png', alt: 'brand1' },
		{ id: 2, img: '/img/brand2.png', alt: 'brand2' },
		{ id: 3, img: '/img/brand3.png', alt: 'brand3' },
		{ id: 4, img: '/img/brand4.png', alt: 'brand4' },
		{ id: 5, img: '/img/brand5.png', alt: 'brand5' },
		{ id: 6, img: '/img/brand3.png', alt: 'brand3' },
		{ id: 7, img: '/img/brand5.png', alt: 'brand5' },
		{ id: 8, img: '/img/brand2.png', alt: 'brand2' },
		{ id: 9, img: '/img/brand4.png', alt: 'brand4' },
		{ id: 10, img: '/img/brand1.png', alt: 'brand1' },
		{ id: 11, img: '/img/brand3.png', alt: 'brand3' },
		{ id: 12, img: '/img/brand2.png', alt: 'brand2' },
	]
	const settings = {
		dots: false,
		infinite: true,
		slidesToScroll: 1,
		variableWidth: true,
		autoplay: true,
		speed: 500,
		nextArrow: <BrandSliderNextArrow darkModeClass={darkModeClass} />,
		prevArrow: <BrandSliderPrevArrow darkModeClass={darkModeClass} />,
	}
	useEffect(() => {
		const slider = document.querySelector(`.${styles.dashboard__brands__slider}`)

		const list = slider?.querySelector('.slick-list') as HTMLElement

		list.style.height = isMedia800 ? '60px' : '80px'

	}, [isMedia800])

	return (
		<Slider {...settings} className={styles.dashboard__brands__slider} >
			{brandItems.map((item) => (
				<div
					key={item.id}
					className={`${styles.dashboard__brands__slide} ${darkModeClass}`}
					style={{ width: isMedia800 ? 124 : 180 }}>
					<img src={item.img} alt={item.alt} />
				</div>
			))}
		</Slider>
	)
}

export default BrandsSlider