import { useMediaQuery } from "@/hooks/useMediaQuery"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "@/styles/tool/index.module.scss"

const ToolSlider = ({ images }: { images: string[] }) => {
	const isMobile850 = useMediaQuery(850)
	const isMobile530 = useMediaQuery(530)
	const settings = {
		dots: false,
		infinite: true,
		variableWidth: true,
		autoplay: true,
		speed: 500,
		arrows: false,
		sledesToScroll: 1
	}
	return (
		<Slider {...settings} className={styles.tool__slide}>
			{images.map((item, i) => (
				<div
					key={i}
					className={styles.tool__slide}
					style={{ width: isMobile530 ? 228 : isMobile850 ? 350 : 593 }}>
					<img src={item} alt={`image-${i + 1}`} />
				</div>
			))}
		</Slider>
	)
}

export default ToolSlider