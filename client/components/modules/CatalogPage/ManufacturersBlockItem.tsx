'use client'
import { useAppDispatch, useAppSelector } from '@/store';
import { motion } from 'framer-motion';
import { IManufacturersBlockItemProps } from '@/types/catalog';
import DeleteSvg from '@/components/elements/svg/DeleteSvg';
import styles from '@/styles/catalog/index.module.scss'

const ManufacturersBlockItem = ({ item, event }: IManufacturersBlockItemProps) => {
	const theme = useAppSelector(state => state.theme.theme)
	const darkModeClass = theme === 'dark' ? `${styles.dark_mode}` : '';

	const dispatch = useAppDispatch()
	const removeFilter = () => {
		dispatch(event({ id: item.id, checked: false }))
	}
	return (
		<motion.li
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			className={`${styles.manufacturers__list__item} ${darkModeClass}`}>
			<span className={styles.manufacturers__list__item__text}>{item.name}</span>
			<button className={styles.manufacturers__list__item__btn} onClick={removeFilter}>
				<span><DeleteSvg /></span>
			</button>
		</motion.li>
	)
}

export default ManufacturersBlockItem