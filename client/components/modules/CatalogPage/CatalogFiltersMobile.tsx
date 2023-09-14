import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import { setManufacturers, setTypesTools, updateManufacturers, updateTypesTools } from '@/store/toolSlice';
import Accordion from '@/components/elements/accordion/Accordion';
import FiltersPopupTop from './FiltersPopupTop';
import FiltersPopup from './FiltersPopup';
import PriceRangeSlider from './PriceRangeSlider';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { ICatalogFilterMobileProps } from '@/types/catalog';
import spinnerStyles from '@/styles/spinner/index.module.scss'
import styles from '@/styles/catalog/index.module.scss'


const CatalogFiltersMobile = ({ spinner,
	applyFilters, resetFilterBtnDisabled, resetFilters,
	closePopup, filtersMobileOpen,
	priceRange, setPriceRange, setIsPriceRangeChanged }: ICatalogFilterMobileProps) => {

	const dispatch = useAppDispatch()
	const theme = useAppSelector(state => state.theme.theme)
	const darkModeClass = theme === 'dark' ? `${styles.dark_mode}` : '';
	const isMobile = useMediaQuery(820)
	const manufacturers = useAppSelector(state => state.tools.manufacturers)
	const typesTools = useAppSelector(state => state.tools.typesTools)
	const [openManufacturers, setOpenManufacturers] = useState(false)
	const [openTypesTools, setOpenTypesTools] = useState(false)
	const handleOpenManufacturers = () => setOpenManufacturers(true)
	const handleCloseManufacturers = () => setOpenManufacturers(false)
	const handleOpenTypesTools = () => setOpenTypesTools(true)
	const handleCloseTypesTools = () => setOpenTypesTools(false)
	const isAnyManufacturerChecked = manufacturers.some(item => item.checked)
	const isAnyTypesChecked = typesTools.some(item => item.checked)

	const applyFiltersAndClosePopup = () => {
		applyFilters()
		closePopup()
	}

	const resetAllManufacturers = () => {
		const allManufactorers = manufacturers.map(item => {
			return {
				...item,
				checked: false
			}
		})
		dispatch(setManufacturers(allManufactorers))
	}

	const resetAllTypesTools = () => {
		const allTypesTools = typesTools.map(item => {
			return {
				...item,
				checked: false
			}
		})
		dispatch(setTypesTools(allTypesTools))
	}

	return (
		<div className={`${styles.catalog__bottom__filters} ${darkModeClass} ${filtersMobileOpen ? styles.open : ''}`}>
			<div className={styles.catalog__bottom__inner}>
				<FiltersPopupTop
					title='Filters'
					resetBtnText='Reset all'
					resetFilters={resetFilters}
					resetFilterBtnDisabled={resetFilterBtnDisabled}
					closePopup={closePopup} />
				<div className={`${styles.filters__manufacturer} ${darkModeClass}`}>
					<button className={`${styles.filters__manufacturer__btn} ${darkModeClass}`} onClick={handleOpenManufacturers}>
						Manufacturers
					</button>
					<FiltersPopup
						resetFilterBtnDisabled={!isAnyManufacturerChecked}
						resetAllManufacturers={resetAllManufacturers}
						handleClosePopup={handleCloseManufacturers}
						updateManufacturers={updateManufacturers}
						setManufacturers={setManufacturers}
						applyFilters={applyFiltersAndClosePopup}
						openPopup={openManufacturers}
						title='Manufacturers'
						manufacturersList={manufacturers}
					/>
				</div>
				<div className={`${styles.filters__manufacturer} ${darkModeClass}`}>
					<button className={`${styles.filters__manufacturer__btn} ${darkModeClass}`} onClick={handleOpenTypesTools}>
						Types
					</button>
					<FiltersPopup
						resetFilterBtnDisabled={!isAnyTypesChecked}
						resetAllManufacturers={resetAllTypesTools}
						handleClosePopup={handleCloseTypesTools}
						updateManufacturers={updateTypesTools}
						setManufacturers={setTypesTools}
						applyFilters={applyFiltersAndClosePopup}
						openPopup={openTypesTools}
						title='Types'
						manufacturersList={typesTools}
					/>
				</div>
				<div className={styles.filters__price}>
					<Accordion
						title='Price'
						titleClass={`${styles.filters__manufacturer__btn} ${darkModeClass}`}
						hideArrowClass={styles.hide_arrow}
						isMobileForFilters={isMobile}
					>
						<div className={`${styles.filters__manufacturer__inner} ${darkModeClass}`}>
							<PriceRangeSlider priceRange={priceRange} setPriceRange={setPriceRange} setIsPriceRangeChanged={setIsPriceRangeChanged} />
						</div>
					</Accordion>
				</div>
			</div>
			<div className={styles.filters__actions}>
				<button className={styles.filters__actions__show} onClick={applyFiltersAndClosePopup} disabled={resetFilterBtnDisabled}>
					{spinner ? (<span
						className={spinnerStyles.spinner}
						style={{ top: 6, left: '47%' }}
					/>) : 'Show'}
				</button>
			</div>
		</div>
	)
}

export default CatalogFiltersMobile