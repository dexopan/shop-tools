import { useState } from 'react';
import { useAppSelector } from '@/store';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import ToolSlider from './ToolSlider';
import ToolImagesItem from './ToolImagesItem';
import styles from "@/styles/tool/index.module.scss"

const ToolImagesList = () => {
	const tool = useAppSelector(state => state.tools.oneTool)
	const isMobile = useMediaQuery(850)
	const images = tool.images ? tool.images : []
	const [currentImgSrc, setCurrentImgSrc] = useState('')
	return (
		<div className={styles.tool__images}>
			{isMobile ? (
				<ToolSlider images={images} />
			) : (
				<>
					<div className={styles.tool__images__main}>
						<img src={currentImgSrc || images[0]} alt={tool.name} />
					</div>
					<ul className={styles.tool__images__list}>
						{images.map((item, i) => (
							<ToolImagesItem key={i} src={item} callback={setCurrentImgSrc} alt={`image-${i + 1}`} />
						))}
					</ul>
				</>
			)}
		</div>
	)
}

export default ToolImagesList