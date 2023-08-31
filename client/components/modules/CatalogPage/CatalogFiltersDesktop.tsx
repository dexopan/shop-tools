'use client'
import { useAppSelector } from "@/store";
import { setManufacturers, setTypesTools, updateManufacturers, updateTypesTools } from '@/store/toolSlice'
import Accordion from "@/components/elements/accordion/Accordion";
import FilterManufacturerAccordion from "./FilterManufacturerAccordion";
import PriceRange from "./PriceRange";
import { ICatalogFilterDesktopProps } from "@/types/catalog";
import spinnerStyles from '@/styles/spinner/index.module.scss'
import styles from '@/styles/catalog/index.module.scss'

const CatalogFiltersDesktop = ({ priceRange, setPriceRange, setIsPriceRangeChanged, resetFilterBtnDisabled, spinner }: ICatalogFilterDesktopProps) => {
	const theme = useAppSelector(state => state.theme.theme)
	const darkModeClass = theme === 'dark' ? `${styles.dark_mode}` : '';
	const manufacturers = useAppSelector(state => state.tools.manufacturers)
	const typesTools = useAppSelector(state => state.tools.typesTools)


	return (
		<div className={`${styles.catalog__bottom__filters} ${darkModeClass}`}>
			<h3 className={`${styles.catalog__bottom__filters__title} ${darkModeClass}`}>Filters</h3>

			<div className={`${styles.filters__manufacturer} ${darkModeClass}`}>
				<FilterManufacturerAccordion
					manufacturersList={manufacturers}
					title='Manufacturer'
					setManufacturers={setManufacturers}
					updateManufacturers={updateManufacturers} />
			</div>

			<div className={styles.filters__price}>
				<Accordion
					title='Price'
					titleClass={`${styles.filters__manufacturer__btn} ${darkModeClass}`}
					arrowOpenClass={styles.open}>
					<div className={`${styles.filters__manufacturer__inner} ${darkModeClass}`}>
						<PriceRange priceRange={priceRange} setPriceRange={setPriceRange} setIsPriceRangeChanged={setIsPriceRangeChanged} />
						<div style={{ height: 24 }} />
					</div>
				</Accordion>
			</div>

			<div className={`${styles.filters__manufacturer} ${darkModeClass}`}>
				<FilterManufacturerAccordion
					manufacturersList={typesTools}
					title='Types'
					setManufacturers={setTypesTools}
					updateManufacturers={updateTypesTools} />
			</div>

			<div className={styles.filters__actions}>
				<button className={styles.filters__actions__show} disabled={spinner || resetFilterBtnDisabled}>
					{spinner ? <span
						className={spinnerStyles.spinner}
						style={{ top: 6, left: '47%' }}
					/> : 'Show'}
				</button>
				<button className={styles.filters__actions__reset} disabled={resetFilterBtnDisabled}>
					Reset
				</button>
			</div>

		</div>
	);
}

export default CatalogFiltersDesktop