import { useAppSelector } from '@/store';
import LocationSvg from "@/components/elements/svg/LocationSvg"
import styles from '@/styles/cityButton/index.module.scss'

const CityButton = () => {
	const theme = useAppSelector(state => state.theme.theme)
	const darkModeClass = theme === 'dark' ? `${styles.dark_mode}` : '';
	return (
		<button className={styles.city} >
			<span className={`${styles.city__span} ${darkModeClass}`}><LocationSvg /></span>
			<span className={`${styles.city__text} ${darkModeClass}`}>Moscow</span>
		</button>
	)
}

export default CityButton