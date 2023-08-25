'use client'
import { useAppSelector } from "@/store";
import FilterManufacturerAccordion from "./FilterManufacturerAccordion";
import { setManufacturers, setTypesTools, updateManufacturers, updateTypesTools } from '@/store/toolSlice'
import styles from '@/styles/catalog/index.module.scss'

const CatalogFiltersDesktop = () => {
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
			<div className={`${styles.filters__manufacturer} ${darkModeClass}`}>
				<FilterManufacturerAccordion
					manufacturersList={typesTools}
					title='Types'
					setManufacturers={setTypesTools}
					updateManufacturers={updateTypesTools} />
			</div>
		</div>
	);
}

export default CatalogFiltersDesktop