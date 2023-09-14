import { useAppSelector } from '@/store';
import { IFiltersPopupTop } from '@/types/catalog';
import styles from '@/styles/catalog/index.module.scss'

const FiltersPopupTop = ({ title, resetBtnText, resetFilters, resetFilterBtnDisabled, closePopup }: IFiltersPopupTop) => {
	const theme = useAppSelector(state => state.theme.theme)
	const darkModeClass = theme === 'dark' ? `${styles.dark_mode}` : '';
	return (
		<div className={`${styles.catalog__bottom__filters__top} ${darkModeClass}`}>
			<button className={`${styles.catalog__bottom__filters__title} ${darkModeClass}`} onClick={closePopup}>{title}</button>
			<button className={styles.catalog__bottom__filters__reset} onClick={resetFilters} disabled={resetFilterBtnDisabled}>
				{resetBtnText}
			</button>
		</div>
	)
}

export default FiltersPopupTop