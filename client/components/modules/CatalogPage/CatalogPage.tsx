'use client'
import { useCallback, useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import ReactPaginate from 'react-paginate';
import { useAppDispatch, useAppSelector } from '@/store';
import { AnimatePresence } from 'framer-motion';
import ManufacturersBlock from './ManufacturersBlock';
import CatalogItem from './CatalogItem';
import FilterSelect from './FilterSelect';
import { toast } from 'react-toastify';
import { getAllTools, getToolsWithLimit } from '@/http/api/tools';
import { setAllTools, setToolWithLimit, setToolsByPopularity, setToolsChepearFirst, setToolsExpensiveFirst } from '@/store/toolSlice';
import styles from '@/styles/catalog/index.module.scss'
import skeletonStyles from '@/styles/skeleton/index.module.scss'


const CatalogPage = () => {
	const dispatch = useAppDispatch()
	const theme = useAppSelector(state => state.theme.theme)
	const darkModeClass = theme === 'dark' ? `${styles.dark_mode}` : '';
	const allTools = useAppSelector(state => state.tools.allTools)
	const limitTools = useAppSelector(state => state.tools.limitTools)
	const [spinner, setSpinner] = useState(false)
	const pagesCount = Math.ceil(allTools.length / 5)
	const isValidOffset = localStorage.getItem('offset') && !isNaN(Number(localStorage.getItem('offset'))) && Number(localStorage.getItem('offset')) > 0
	const [currentPage, setCurrentPage] = useState(isValidOffset ? Number(localStorage.getItem('offset')) - 1 : 0)

	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()
	const createQueryString = useCallback(
		(name: string, value: string) => {
			const params = new URLSearchParams()
			params.set(name, value)
			return params.toString()
		},
		[searchParams]
	)

	const loadTools = async () => {
		try {
			setSpinner(true)
			const allData = await getAllTools('/api/tool/all')
			const limitData = await getToolsWithLimit('/api/tool?limit=4&offset=0')
			dispatch(setAllTools(allData))
			if (!isValidOffset) {
				const offsetQuery = createQueryString('offset', '1')
				const sortQuery = localStorage.getItem('sort') ? createQueryString('sort', String(localStorage.getItem('sort'))) : ''
				router.push(`${pathname}?${sortQuery}&${offsetQuery}`)

				localStorage.setItem('offset', '1')
				setCurrentPage(0)
				dispatch(setToolWithLimit(limitData))
				return
			}

			if (isValidOffset) {
				if (Number(localStorage.getItem('offset')) > pagesCount) {
					if (limitData.length === 0) {
						const offsetQuery = createQueryString('offset', '1')
						const sortQuery = localStorage.getItem('sort') ? createQueryString('sort', String(localStorage.getItem('sort'))) : ''
						router.push(`${pathname}?${sortQuery}&${offsetQuery}`)

						localStorage.setItem('offset', '1')
						setCurrentPage(0)
						dispatch(setToolWithLimit(limitData))
						return
					}
				}
			}

			const offset = Number(localStorage.getItem('offset')) - 1
			const result = await getToolsWithLimit(`/api/tool?limit=4&offset=${offset}`)
			setCurrentPage(offset)
			dispatch(setToolWithLimit(result))
		} catch (error: any) {
			toast.error(error.response)
		} finally {
			setSpinner(false)
		}
	}

	useEffect(() => {
		loadTools()
	}, [])

	const handlePageChange = async ({ selected }: { selected: number }) => {
		const limitData = await getToolsWithLimit('/api/tool?limit=4&offset=0')
		if (selected > pagesCount) {
			setCurrentPage(0)
			dispatch(setToolWithLimit(limitData))
			return
		}

		if (isValidOffset && Number(localStorage.getItem('offset')) > pagesCount) {
			setCurrentPage(0)
			dispatch(setToolWithLimit(limitData))
			return
		}
		const offset = selected + 1
		const offsetQuery = createQueryString('offset', offset.toString())
		const sortQuery = localStorage.getItem('sort') ? createQueryString('sort', String(localStorage.getItem('sort'))) : ''
		router.push(`${pathname}?${sortQuery}&${offsetQuery}`)

		localStorage.setItem('offset', offset.toString())
		setCurrentPage(selected)
		const result = await getToolsWithLimit(`/api/tool?limit=4&offset=${selected}`)
		dispatch(setToolWithLimit(result))
		switch (localStorage.getItem('sort')) {
			case 'cheap':
				dispatch(setToolsChepearFirst())
				break;
			case 'expensive':
				dispatch(setToolsExpensiveFirst())
				break;
			case 'popular':
				dispatch(setToolsByPopularity())
				break;
			default:
				dispatch(setToolsChepearFirst())
				break;
		}
	}

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
								{Array.from(Array(8).keys()).map((_, i) => (
									<li key={i} className={`${skeletonStyles.skeleton__item} ${theme === 'dark' ? `${skeletonStyles.dark_mode}` : ''}`}>
										<div className={skeletonStyles.skeleton__item__light} />
									</li>
								))}
							</ul>
						) : (<ul className={styles.catalog__list}>
							{limitTools.length ? (limitTools.map((item) => (
								<CatalogItem key={item.id} item={item} />
							))) : (<span>No products found</span>)
							}
						</ul>
						)}
					</div>
					<ReactPaginate
						containerClassName={styles.catalog__bottom__list}
						pageClassName={styles.catalog__bottom__list__item}
						pageLinkClassName={`${styles.catalog__bottom__list__item__link} ${darkModeClass}`}
						previousClassName={styles.catalog__bottom__list__prev}
						nextClassName={styles.catalog__bottom__list__next}
						breakClassName={`${styles.catalog__bottom__list__break} ${darkModeClass}`}
						breakLinkClassName={`${styles.catalog__bottom__list__break__link} ${darkModeClass}`}
						breakLabel={'...'}
						pageCount={pagesCount}
						forcePage={currentPage}
						onPageChange={handlePageChange}
					/>
				</div>
			</div>
		</section>
	);
}

export default CatalogPage