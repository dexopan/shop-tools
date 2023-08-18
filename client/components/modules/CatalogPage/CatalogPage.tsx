'use client'
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import { AnimatePresence } from 'framer-motion';
import ManufacturersBlock from './ManufacturersBlock';
import FilterSelect from './FilterSelect';
import { toast } from 'react-toastify';
import { getTools } from '@/http/api/tools';
import { setTools } from '@/store/toolSlice';
import styles from '@/styles/catalog/index.module.scss'
import skeletonStyles from '@/styles/skeleton/index.module.scss'
import CatalogItem from './CatalogItem';

const CatalogPage = () => {
	const dispatch = useAppDispatch()
	const theme = useAppSelector(state => state.theme.theme)
	const darkModeClass = theme === 'dark' ? `${styles.dark_mode}` : '';
	const tools = useAppSelector(state => state.tools.tools)
	const [spinner, setSpinner] = useState(false)

	const loadTools = async () => {
		try {
			setSpinner(true)
			const data = await getTools('/api/tool?limit=10&offset=1')
			dispatch(setTools(data))
		} catch (error: any) {
			toast.error(error.response.data.message)
		} finally {
			setSpinner(false)
		}
	}

	useEffect(() => {
		loadTools()
	}, [])



	return (
		<section className={styles.catalog}>
			<div className={`container ${styles.catalog__container}`}>
				<h2 className={`${styles.catalog__title} ${darkModeClass}`}>Product catalog</h2>
				<div className={`${styles.catalog__top} ${darkModeClass}`}>
					<AnimatePresence>
						<ManufacturersBlock title='Manufacturers:' />
					</AnimatePresence>
					<AnimatePresence>
						<ManufacturersBlock title='Types:' />
					</AnimatePresence>
					<div className={styles.catalog__top__inner}>
						<button className={`${styles.catalog__top__reset} ${darkModeClass}`} disabled={true}>Reset filters</button>
						<FilterSelect />
					</div>
				</div>
				<div className={`${styles.catalog__bottom} ${darkModeClass}`}>
					<div className={styles.catalog__bottom__inner}>
						<div>Filters</div>
						{spinner ? (
							<ul className={skeletonStyles.skeleton}>
								{Array.from(new Array(8)).map((_, i) => (
									<li key={i} className={`${skeletonStyles.skeleton__item} ${theme === 'dark' ? `${skeletonStyles.dark_mode}` : ''}`}>
										<div className={skeletonStyles.skeleton__item__light} />
									</li>
								))}
							</ul>
						) : (<ul className={styles.catalog__list}>
							{tools.length ? (tools.map((item) => (
								<CatalogItem key={item.id} item={item} />
							))) : (<span>No products found</span>)
							}
						</ul>
						)}
					</div>
				</div>
			</div>
		</section>
	);
}

export default CatalogPage