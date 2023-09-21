import { IToolImagesItemProps } from '@/types/tool'
import styles from "@/styles/tool/index.module.scss"

const ToolImagesItem = ({ src, callback, alt }: IToolImagesItemProps) => {
	const changeMainImage = () => callback(src)
	return (
		<li className={styles.tool__images__list__item} onClick={changeMainImage}>
			<img src={src} alt={alt} />
		</li>
	)
}

export default ToolImagesItem