import { useAppDispatch, useAppSelector } from '@/store';
import { IFilterCheckboxItem } from '@/types/catalog'
import styles from '@/styles/catalog/index.module.scss'


const FilterCheckboxItem = ({ name, checked, id, event }: IFilterCheckboxItem) => {
	const theme = useAppSelector(state => state.theme.theme)
	const darkModeClass = theme === 'dark' ? `${styles.dark_mode}` : '';
	const dispatch = useAppDispatch()
	const handleFilterChange = () => {
		const obj = {
			id,
			checked: !checked
		}
		dispatch(event(obj))
	}

	return (
		<li className={`${styles.filters__manufacturer__list__item} ${darkModeClass}`}>
			<label>
				<input type="checkbox" checked={checked} onChange={handleFilterChange} />
				<span>{name}</span>
			</label>
		</li>
	)
}


export default FilterCheckboxItem