'use client'
import { useCallback, useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Select from 'react-select';
import { useAppDispatch, useAppSelector } from '@/store';
import { setToolWithLimit } from '@/store/toolSlice';
import { getToolsWithLimit } from '@/http/api/tools';
import { createSelectOption } from '@/utils/common';
import { categoriesOption } from '@/utils/selectContent';
import { ISelectOption, SelectOptionType } from '@/types/common';
import { IFilterSelectProps } from '@/types/catalog';
import { selectStyles, controlStyles, menuStyles } from '@/styles/catalog/select';
import { optionStyles } from '@/styles/searchInput';

const FilterSelect = ({ priceRange }: IFilterSelectProps) => {
	const updateCategoryOption = (value: string) => {
		setCategorOption(createSelectOption(value))
	}
	const theme = useAppSelector(state => state.theme.theme)
	const [categoryOption, setCategorOption] = useState<SelectOptionType>({ value: 'Сheap ones first', label: 'Сheap ones first' })
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

	const updateRoteParam = (first: string) => {
		const sortQuery = createQueryString('sort', first)
		const offsetQuery = localStorage.getItem('offset') ? createQueryString('offset', String(localStorage.getItem('offset'))) : ''
		const priceFrom = localStorage.getItem('priceFrom')
		const priceTo = localStorage.getItem('priceTo')
		const priceQuery = (localStorage.getItem('priceFrom') || localStorage.getItem('priceTo')) ? `&priceFrom=${priceFrom}&priceTo=${priceTo}` : ''

		const manufacturersToLocalStorage = localStorage.getItem('manufacturers') ? JSON.parse(localStorage.getItem('manufacturers') || '') : []
		const typesToolsToLocalStorage = localStorage.getItem('typesTools') ? JSON.parse(localStorage.getItem('typesTools') || '') : []
		const encodedManufacturers = manufacturersToLocalStorage.length ? encodeURIComponent(JSON.stringify(manufacturersToLocalStorage)) : ''
		const encodedTypesTools = typesToolsToLocalStorage.length ? encodeURIComponent(JSON.stringify(typesToolsToLocalStorage)) : ''
		const manufacturersQuery = encodedManufacturers ? `&manufacturers=${encodedManufacturers}` : ''
		const typesToolsQuery = encodedTypesTools ? `&typesTools=${encodedTypesTools}` : ''

		router.push(`${pathname}?${sortQuery}&${offsetQuery}${priceQuery}${manufacturersQuery}${typesToolsQuery}`)
		localStorage.setItem('sort', first)
	}

	useEffect(() => {
		const fetchTools = async () => {
			const offset = Number(localStorage.getItem('offset')) - 1
			const priceFrom = priceRange[0]
			const priceTo = priceRange[1]
			const priceQuery = (localStorage.getItem('priceFrom') || localStorage.getItem('priceTo')) ? `&priceFrom=${priceFrom}&priceTo=${priceTo}` : ''

			const manufacturersToLocalStorage = localStorage.getItem('manufacturers') ? JSON.parse(localStorage.getItem('manufacturers') || '') : []
			const typesToolsToLocalStorage = localStorage.getItem('typesTools') ? JSON.parse(localStorage.getItem('typesTools') || '') : []
			const encodedManufacturers = manufacturersToLocalStorage.length ? encodeURIComponent(JSON.stringify(manufacturersToLocalStorage)) : ''
			const encodedTypesTools = typesToolsToLocalStorage.length ? encodeURIComponent(JSON.stringify(typesToolsToLocalStorage)) : ''
			const manufacturersQuery = `&manufacturers=${encodedManufacturers}`
			const typesToolsQuery = `&typesTools=${encodedTypesTools}`

			const firstCheap = await getToolsWithLimit(`/api/tool?limit=4&offset=${offset}&sort=cheap${priceQuery}${manufacturersQuery}${typesToolsQuery}`)

			switch (localStorage.getItem('sort')) {
				case 'cheap':
					updateCategoryOption('Сheap ones first')
					dispatch(setToolWithLimit(firstCheap))
					break;
				case 'expensive':
					const firstExpensive = await getToolsWithLimit(`/api/tool?limit=4&offset=${offset}&sort=expensive${priceQuery}${manufacturersQuery}${typesToolsQuery}`)
					updateCategoryOption('Expensive ones first')
					dispatch(setToolWithLimit(firstExpensive))
					break;
				case 'popular':
					const firstPopular = await getToolsWithLimit(`/api/tool?limit=4&offset=${offset}&sort=popular${priceQuery}${manufacturersQuery}${typesToolsQuery}`)
					updateCategoryOption('By popularity')
					dispatch(setToolWithLimit(firstPopular))
					break;
				default:
					updateCategoryOption('Сheap ones first')
					dispatch(setToolWithLimit(firstCheap))
					break;
			}

		}
		fetchTools()
	}, [localStorage.getItem('sort')])



	const handleSortOptionChange = async (selectedOption: SelectOptionType) => {
		setCategorOption(selectedOption)
		switch ((selectedOption as ISelectOption).value) {
			case 'Сheap ones first':
				updateRoteParam('cheap')
				break;
			case 'Expensive ones first':
				updateRoteParam('expensive')
				break;
			case 'By popularity':
				updateRoteParam('popular')
				break;
		}
	}

	return (
		<Select
			value={categoryOption as ISelectOption}
			onChange={handleSortOptionChange}
			styles={{
				...selectStyles,
				control: (defState) => ({
					...controlStyles(defState, theme)
				}),
				input: (defState) => ({
					...defState,
					color: theme === 'dark' ? '#f2f2f2' : '#222222',
				}),
				menu: (defState) => ({
					...menuStyles(defState, theme)
				}),
				option: (defState, state) => ({
					...optionStyles(defState, state, theme),
				}),
			}}
			isSearchable={false}
			options={categoriesOption}
		/>
	)
}

export default FilterSelect