'use client'
import { useCallback, useState } from 'react'
import { toast } from 'react-toastify'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { setAllTools, setToolWithLimit } from '@/store/toolSlice'
import { useAppSelector, useAppDispatch } from '@/store'
import { getAllTools, getToolsWithLimit } from '@/http/api/tools'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import CatalogFiltersDesktop from './CatalogFiltersDesktop'
import CatalogFiltersMobile from './CatalogFiltersMobile'
import { ICatalogFilterProps } from '@/types/catalog'


const CatalogFilters = ({
	priceRange,
	setPriceRange,
	setIsPriceRangeChanged,
	resetFilterBtnDisabled,
	resetFilters,
	isPriceRangeChanged,
	setCurrentPage,
	closePopup,
	filtersMobileOpen
}: ICatalogFilterProps) => {
	const isMobile = useMediaQuery(820)
	const [spinner, setSpinner] = useState(false)
	const manufacturers = useAppSelector(state => state.tools.manufacturers)
	const typesTools = useAppSelector(state => state.tools.typesTools)

	const dispatch = useAppDispatch()
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

	const applyFilters = async () => {
		try {
			setSpinner(true)
			const priceFrom = priceRange[0]
			const priceTo = priceRange[1]
			const priceQuery = isPriceRangeChanged ? `&priceFrom=${priceFrom}&priceTo=${priceTo}` : ''
			const checkedManufacturers = manufacturers.filter(item => item.checked).map(item => item.name)
			const checkedTypesTools = typesTools.filter(item => item.checked).map(item => item.name)
			const encodedManufacturers = checkedManufacturers.length ? encodeURIComponent(JSON.stringify(checkedManufacturers)) : ''
			const encodedTypesTools = checkedTypesTools.length ? encodeURIComponent(JSON.stringify(checkedTypesTools)) : ''
			const manufacturersQuery = `&manufacturers=${encodedManufacturers}`
			const typesToolsQuery = `&typesTools=${encodedTypesTools}`
			const initialPage = 0
			const offsetQuery = createQueryString('offset', (initialPage + 1).toString())
			const sortQuery = createQueryString('sort', String(localStorage.getItem('sort')))
			const allData = await getAllTools(`/api/tool/all?${priceQuery}${manufacturersQuery}${typesToolsQuery}`)
			localStorage.setItem('offset', '1')
			localStorage.setItem('priceFrom', priceFrom.toString())
			localStorage.setItem('priceTo', priceTo.toString())
			localStorage.setItem('manufacturers', JSON.stringify(checkedManufacturers))
			localStorage.setItem('typesTools', JSON.stringify(checkedTypesTools))
			dispatch(setAllTools(allData))
			setCurrentPage(initialPage)
			const response = await getToolsWithLimit(`/api/tool?limit=4&offset=${initialPage}&${sortQuery}${priceQuery}${manufacturersQuery}${typesToolsQuery}`)
			dispatch(setToolWithLimit(response))
			if (checkedManufacturers.length && checkedTypesTools.length && isPriceRangeChanged) {
				router.push(`${pathname}?${sortQuery}&${offsetQuery}${priceQuery}${manufacturersQuery}${typesToolsQuery}`)
				return
			}

			if (checkedManufacturers.length && checkedTypesTools.length) {
				router.push(`${pathname}?${sortQuery}&${offsetQuery}${manufacturersQuery}${typesToolsQuery}`)
				return
			}

			if (checkedManufacturers.length && isPriceRangeChanged) {
				router.push(`${pathname}?${sortQuery}&${offsetQuery}${priceQuery}${manufacturersQuery}`)
				return
			}

			if (checkedTypesTools.length && isPriceRangeChanged) {
				router.push(`${pathname}?${sortQuery}&${offsetQuery}${priceQuery}${typesToolsQuery}`)
				return
			}

			if (isPriceRangeChanged) {
				router.push(`${pathname}?${sortQuery}&${offsetQuery}${priceQuery}`)
				return
			}

			if (checkedManufacturers.length) {
				router.push(`${pathname}?${sortQuery}&${offsetQuery}${manufacturersQuery}`)
				return
			}

			if (checkedTypesTools.length) {
				router.push(`${pathname}?${sortQuery}&${offsetQuery}${typesToolsQuery}`)
				return
			}

		} catch (error) {
			toast.error((error as Error).message)
		} finally {
			setSpinner(false)
		}
	}
	return (
		<>
			{isMobile ? <CatalogFiltersMobile
				priceRange={priceRange}
				setPriceRange={setPriceRange}
				setIsPriceRangeChanged={setIsPriceRangeChanged}
				resetFilterBtnDisabled={resetFilterBtnDisabled}
				spinner={spinner}
				resetFilters={resetFilters}
				applyFilters={applyFilters}
				closePopup={closePopup}
				filtersMobileOpen={filtersMobileOpen} /> :
				<CatalogFiltersDesktop
					priceRange={priceRange}
					setPriceRange={setPriceRange}
					setIsPriceRangeChanged={setIsPriceRangeChanged}
					resetFilterBtnDisabled={resetFilterBtnDisabled}
					spinner={spinner}
					resetFilters={resetFilters}
					applyFilters={applyFilters} />}
		</>
	)
}

export default CatalogFilters