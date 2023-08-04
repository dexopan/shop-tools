'use client';
import { useEffect } from "react";
import Link from "next/link";
import Slider from "react-slick";
import { useAppSelector } from "@/store";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { formatPrice } from "@/utils/common";
import { ITool } from "@/types/tool";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from '@/styles/dashboard/index.module.scss'
import skeletonStyles from '@/styles/skeleton/index.module.scss'


interface IDashboardSlider {
	items: ITool[]
	spinner: boolean
	goToPartPage?: boolean
}

const DashboardSlider = ({ items, spinner, goToPartPage }: IDashboardSlider) => {
	const theme = useAppSelector(state => state.theme.theme)
	const darkModeClass = theme === 'dark' ? `${styles.dark_mode}` : '';
	const isMedia768 = useMediaQuery(768)
	const isMedia1366 = useMediaQuery(1366)
	const isMedia1030 = useMediaQuery(1030)
	const isMedia800 = useMediaQuery(800)
	const isMedia560 = useMediaQuery(560)

	const settings = {
		dots: false,
		infinite: true,
		variableWidth: true,
		autoplay: true,
		speed: 500,
		arrows: false,
		slidesToShow: items.length >= 4 ? (isMedia1030 ? 3 : 4) : items.length - 1,
		sledesToScroll: isMedia768 ? 1 : 2,
	}

	const width = {
		width: isMedia1366 ? (isMedia800 ? (isMedia560 ? 160 : 252) : 317) : 344
	}


	return (
		<Slider {...settings} className={styles.dashboard__brands__slider}  >
			{spinner
				? (
					[...Array(8)].map((item) => (
						<div key={item} className={`${skeletonStyles.skeleton__item} ${theme === 'dark' ? `${skeletonStyles.dark_mode}` : ''}`} style={width}>
							<div className={skeletonStyles.skeleton__item__light} />
						</div>
					)))
				:
				items.length ? (
					items.map((item) => (
						<div className={`${styles.dashboard__slide} ${darkModeClass}`} key={item.id} style={width}>
							<img src={item.images[0]} alt={item.name} />
							<div className={styles.dashboard__slide__inner}>
								<Link href={goToPartPage ? `catalog/${item.id}` : `/catalog`}>
									<a href="">
										<h3 className={styles.dashboard__slide__title}>
											{item.name}
										</h3>
									</a>
								</Link>
								<span className={styles.dashboard__slide__code}>Vednor code: {item.vendorCode}</span>
								<span className={styles.dashboard__slide__price}>{formatPrice(item.priceOne)} P </span>
							</div>
						</div>
					))
				) : (<span>List is empty...</span>)
			}
		</Slider>
	)
}

export default DashboardSlider