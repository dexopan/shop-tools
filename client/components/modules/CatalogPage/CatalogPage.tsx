'use client'
import { useCallback, useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import ReactPaginate from 'react-paginate';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '@/store';
import { AnimatePresence } from 'framer-motion';
import ManufacturersBlock from './ManufacturersBlock';
import CatalogItem from './CatalogItem';
import FilterSelect from './FilterSelect';
import CatalogFilters from './CatalogFilters';
import { getAllTools, getToolsWithLimit } from '@/http/api/tools';
import { setAllTools, setManufacturers, setToolWithLimit, setTypesTools, updateManufacturers, updateTypesTools } from '@/store/toolSlice';
import styles from '@/styles/catalog/index.module.scss'
import skeletonStyles from '@/styles/skeleton/index.module.scss'


const CatalogPage = () => {
	const dispatch = useAppDispatch()
	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()
	const theme = useAppSelector(state => state.theme.theme)
	const darkModeClass = theme === 'dark' ? `${styles.dark_mode}` : '';
	const allTools = useAppSelector(state => state.tools.allTools)
	const limitTools = useAppSelector(state => state.tools.limitTools)
	const [spinner, setSpinner] = useState(false)
	const pagesCount = Math.ceil(allTools.length / 4)
	const isValidOffset = searchParams.has('offset') && !isNaN(Number(searchParams.get('offset'))) && Number(searchParams.get('offset')) > 0
	const [currentPage, setCurrentPage] = useState(isValidOffset ? Number(localStorage.getItem('offset')) - 1 : 0)

	const manufacturers = useAppSelector(state => state.tools.manufacturers)
	const typesTools = useAppSelector(state => state.tools.typesTools)

	const isPriceRangeInLocalStorage = (localStorage.getItem('priceFrom') || (localStorage.getItem('priceTo'))) ? true : false
	const [priceRange, setPriceRange] = useState(isPriceRangeInLocalStorage ? [Number(localStorage.getItem('priceFrom')), Number(localStorage.getItem('priceTo'))] : [1000, 9000])
	const [isPriceRangeChanged, setIsPriceRangeChanged] = useState(isPriceRangeInLocalStorage)
	const isAnyManufacturerChecked = manufacturers.some(item => item.checked)
	const isAnyTypesChecked = typesTools.some(item => item.checked)
	const resetFilterBtnDisabled = !(isAnyManufacturerChecked || isAnyTypesChecked || isPriceRangeChanged)

	const priceFrom = priceRange[0]
	const priceTo = priceRange[1]
	const priceQuery = (localStorage.getItem('priceFrom') || localStorage.getItem('priceTo')) ? `&priceFrom=${priceFrom}&priceTo=${priceTo}` : ''
	const checkedManufacturers = manufacturers.filter(item => item.checked).map(item => item.name)
	const checkedTypesTools = typesTools.filter(item => item.checked).map(item => item.name)
	const encodedManufacturers = checkedManufacturers.length ? encodeURIComponent(JSON.stringify(checkedManufacturers)) : ''
	const encodedTypesTools = checkedTypesTools.length ? encodeURIComponent(JSON.stringify(checkedTypesTools)) : ''
	const manufacturersQuery = `&manufacturers=${encodedManufacturers}`
	const typesToolsQuery = `&typesTools=${encodedTypesTools}`

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
			const allData = await getAllTools(`/api/tool/all?${priceQuery}${manufacturersQuery}${typesToolsQuery}`)
			const sortQuery = localStorage.getItem('sort') ? createQueryString('sort', String(localStorage.getItem('sort'))) : ''
			const offsetQuery = createQueryString('offset', '1')
			const limitData = await getToolsWithLimit(`/api/tool?limit=4&offset=0&${sortQuery}${priceQuery}${manufacturersQuery}${typesToolsQuery}`)
			dispatch(setAllTools(allData))
			if (!isValidOffset) {
				router.push(`${pathname}?${sortQuery}&${offsetQuery}`)
				localStorage.setItem('offset', '1')
				setCurrentPage(0)
				dispatch(setToolWithLimit(limitData))
				return
			}

			if (isValidOffset) {
				if (Number(searchParams.get('offset')) > Math.ceil(allData.length / 4)) {
					router.push(`${pathname}?${sortQuery}&${offsetQuery}`)
					localStorage.setItem('offset', '1')
					setCurrentPage(0)
					dispatch(setToolWithLimit(limitData))
					return
				}
			}

			const offset = Number(searchParams.get('offset')) - 1
			localStorage.setItem('offset', `${offset + 1}`)
			const sortFilter = localStorage.getItem('sort') ? createQueryString('sort', String(localStorage.getItem('sort'))) : ''
			const result = await getToolsWithLimit(`/api/tool?limit=4&offset=${offset}&${sortFilter}${priceQuery}${manufacturersQuery}${typesToolsQuery}`)

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
		const manufacturersToLocalStorage = localStorage.getItem('manufacturers') ? JSON.parse(localStorage.getItem('manufacturers') || '') : []
		const typesToolsToLocalStorage = localStorage.getItem('typesTools') ? JSON.parse(localStorage.getItem('typesTools') || '') : []
		const encodedManufacturers = manufacturersToLocalStorage.length ? encodeURIComponent(JSON.stringify(manufacturersToLocalStorage)) : ''
		const encodedTypesTools = typesToolsToLocalStorage.length ? encodeURIComponent(JSON.stringify(typesToolsToLocalStorage)) : ''
		const manufacturersQuery = `&manufacturers=${encodedManufacturers}`
		const typesToolsQuery = `&typesTools=${encodedTypesTools}`
		const sortQuery = localStorage.getItem('sort') ? createQueryString('sort', String(localStorage.getItem('sort'))) : ''
		const limitData = await getToolsWithLimit(`/api/tool?limit=4&offset=0&${sortQuery}${priceQuery}${manufacturersQuery}${typesToolsQuery}`)
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
		router.push(`${pathname}?${sortQuery}&${offsetQuery}${priceQuery}${manufacturersQuery}${typesToolsQuery}`)
		localStorage.setItem('offset', offset.toString())
		setCurrentPage(selected)
		const result = await getToolsWithLimit(`/api/tool?limit=4&offset=${selected}&${sortQuery}${priceQuery}${manufacturersQuery}${typesToolsQuery}`)
		dispatch(setToolWithLimit(result))
	}

	const resetFilters = async () => {
		const allManufactorers = manufacturers.map(item => {
			return {
				...item,
				checked: false
			}
		})
		const allTypes = typesTools.map(item => {
			return {
				...item,
				checked: false
			}
		})
		dispatch(setManufacturers(allManufactorers))
		dispatch(setTypesTools(allTypes))
		setPriceRange([1000, 9000])
		setIsPriceRangeChanged(false)
		setCurrentPage(0)
		localStorage.removeItem('priceFrom')
		localStorage.removeItem('priceTo')
		localStorage.removeItem('manufacturers')
		localStorage.removeItem('typesTools')
		localStorage.setItem('offset', '1')
		const sort = localStorage.getItem('sort')
		const priceQuery = ''
		const manufacturersQuery = '&manufacturers='
		const typesToolsQuery = '&typesTools='
		const allData = await getAllTools(`/api/tool/all?${priceQuery}${manufacturersQuery}${typesToolsQuery}`)
		dispatch(setAllTools(allData))
		const limitData = await getToolsWithLimit(`/api/tool?limit=4&offset=0&sort=${sort}${priceQuery}${manufacturersQuery}${typesToolsQuery}`)
		dispatch(setToolWithLimit(limitData))
		router.push(`${pathname}?sort=${sort}&offset=1`)

	}


	return (
		<section className={styles.catalog}>
			<div className={`container ${styles.catalog__container}`}>
				<h2 className={`${styles.catalog__title} ${darkModeClass}`}>Product catalog</h2>
				<div className={`${styles.catalog__top} ${darkModeClass}`}>
					<AnimatePresence>
						{isAnyManufacturerChecked && <ManufacturersBlock title='Manufacturers:' manufacturersList={manufacturers} event={updateManufacturers} />}
					</AnimatePresence>
					<AnimatePresence>
						{isAnyTypesChecked && <ManufacturersBlock title='Types:' manufacturersList={typesTools} event={updateTypesTools} />}
					</AnimatePresence>
					<div className={styles.catalog__top__inner}>
						<button className={`${styles.catalog__top__reset} ${darkModeClass}`} disabled={resetFilterBtnDisabled} onClick={resetFilters}>Reset filters</button>
						<FilterSelect priceRange={priceRange} />
					</div>
				</div>
				<div className={`${styles.catalog__bottom} ${darkModeClass}`}>
					<div className={styles.catalog__bottom__inner}>
						<CatalogFilters
							priceRange={priceRange}
							setPriceRange={setPriceRange}
							setIsPriceRangeChanged={setIsPriceRangeChanged}
							resetFilterBtnDisabled={resetFilterBtnDisabled}
							resetFilters={resetFilters}
							isPriceRangeChanged={isPriceRangeChanged}
							setCurrentPage={setCurrentPage} />
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