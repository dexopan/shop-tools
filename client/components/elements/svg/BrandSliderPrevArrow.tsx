import { CustomArrowProps } from "react-slick"
import BrandSliderArrowSvg from "./BrandSliderArrowSvg"
import styles from '@/styles/dashboard/index.module.scss'


interface IBrandSliderArrow extends CustomArrowProps {
	darkModeClass: string
}

const BrandSliderPrevArrow = (props: IBrandSliderArrow) => {

	return (
		<button className={`${styles.dashboard__brands__slider__arrow} ${styles.dashboard__brands__slider__arrow_prev} ${props.darkModeClass}`}
			onClick={props.onClick}>
			<span>
				<BrandSliderArrowSvg />
			</span>
		</button>
	)
}

export default BrandSliderPrevArrow