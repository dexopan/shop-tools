'use client'
import { useAppDispatch, useAppSelector } from "@/store";
import Accordion from '@/components/elements/accordion/Accordion'
import FilterCheckboxItem from "./FilterCheckboxItem";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { IFilterManufacturerAccordionProps } from "@/types/catalog";
import styles from '@/styles/catalog/index.module.scss'



const FilterManufacturerAccordion = ({ manufacturersList, title, setManufacturers, updateManufacturers }: IFilterManufacturerAccordionProps) => {
	const theme = useAppSelector(state => state.theme.theme)
	const darkModeClass = theme === 'dark' ? `${styles.dark_mode}` : '';
	const isMobile = useMediaQuery(820)
	const dispatch = useAppDispatch()
	const chooseAllManufacturers = () => {
		const allManufactorers = manufacturersList.map(item => {
			return {
				...item,
				checked: true
			}
		})
		dispatch(setManufacturers(allManufactorers))
	}
	return (
		<Accordion
			title={title}
			titleClass={`${styles.filters__manufacturer__btn} ${darkModeClass}`}
			arrowOpenClass={styles.open}
			isMobileForFilters={isMobile}
			hideArrowClass={isMobile ? styles.hide_arrow : ''}
		>
			<div className={styles.filters__manufacturer__inner}>
				<button className={styles.filters__manufacturer__select_all} onClick={chooseAllManufacturers}>
					Select all
				</button>
				<ul className={styles.filters__manufacturer__list}>
					{manufacturersList.map(item => (
						<FilterCheckboxItem
							key={item.id}
							name={item.name}
							checked={item.checked}
							id={item.id}
							event={updateManufacturers}
						/>
					))}
				</ul>
				<div style={{ height: 24 }}></div>
			</div>
		</Accordion>
	)
}

export default FilterManufacturerAccordion