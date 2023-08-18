'use client'
import { useAppSelector } from '@/store';
import { motion } from 'framer-motion';
import { IManufacturersBlockProps } from '@/types/catalog';
import styles from '@/styles/catalog/index.module.scss'

const ManufacturersBlock = ({ title }: IManufacturersBlockProps) => {
	const theme = useAppSelector(state => state.theme.theme)
	const darkModeClass = theme === 'dark' ? `${styles.dark_mode}` : '';
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			className={`${styles.catalog__alert} ${darkModeClass}`}>
			<h3 className={`${styles.manufacturers__title} ${darkModeClass}`}>
				{title}
			</h3>
			<ul className={styles.manufacturers__list}>
				{[].map((item) => (
					<li key={item}>
					</li>
				))}
			</ul>
		</motion.div>
	)
}

export default ManufacturersBlock