import { useAppSelector } from '@/store';
import { IFiltersPopupProps } from '@/types/catalog'
import FiltersPopupTop from './FiltersPopupTop';
import FilterManufacturerAccordion from './FilterManufacturerAccordion';
import styles from '@/styles/catalog/index.module.scss'

const FiltersPopup = ({
	resetFilterBtnDisabled,
	resetAllManufacturers,
	handleClosePopup,
	updateManufacturers,
	setManufacturers,
	applyFilters,
	openPopup,
	title,
	manufacturersList
}: IFiltersPopupProps) => {

	const theme = useAppSelector(state => state.theme.theme)
	const darkModeClass = theme === 'dark' ? `${styles.dark_mode}` : '';

	return (
		<div className={`${styles.filters__popup} ${darkModeClass} ${openPopup ? styles.open : ''}`}>
			<div className={styles.filters__popup__inner}>
				<FiltersPopupTop
					title={title as string}
					resetBtnText='Reset'
					resetFilters={resetAllManufacturers}
					resetFilterBtnDisabled={resetFilterBtnDisabled}
					closePopup={handleClosePopup} />
				<FilterManufacturerAccordion
					manufacturersList={manufacturersList}
					title={false}
					setManufacturers={setManufacturers}
					updateManufacturers={updateManufacturers} />
			</div>
			<div className={styles.filters__actions}>
				<button className={styles.filters__actions__show} disabled={resetFilterBtnDisabled} onClick={applyFilters}>
					Show
				</button>
				<button className={styles.filters__actions__reset} onClick={handleClosePopup}>
					Back
				</button>
			</div>
		</div>
	)
}

export default FiltersPopup