'use client'
import { useCallback, useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Select from 'react-select';
import { useAppDispatch, useAppSelector } from '@/store';
import { setToolsChepearFirst, setToolsExpensiveFirst, setToolsByPopularity } from '@/store/toolSlice';
import { createSelectOption } from '@/utils/common';
import { categoriesOption } from '@/utils/selectContent';
import { ISelectOption, SelectOptionType } from '@/types/common';
import { selectStyles, controlStyles, menuStyles } from '@/styles/catalog/select';
import { optionStyles } from '@/styles/searchInput';

const FilterSelect = () => {
	const theme = useAppSelector(state => state.theme.theme)
	const limitTools = useAppSelector(state => state.tools.limitTools)
	const [categoryOption, setCategorOption] = useState<SelectOptionType>(null)
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
		router.push(`${pathname}?${sortQuery}&${offsetQuery}`)
		localStorage.setItem('sort', first)
	}

	useEffect(() => {
		if (limitTools.length) {
			switch (localStorage.getItem('sort')) {
				case 'cheap':
					updateCategoryOption('Сheap ones first')
					dispatch(setToolsChepearFirst())
					break;
				case 'expensive':
					updateCategoryOption('Expensive ones first')
					dispatch(setToolsExpensiveFirst())
					break;
				case 'popular':
					updateCategoryOption('By popularity')
					dispatch(setToolsByPopularity())
					break;
				default:
					updateCategoryOption('Сheap ones first')
					dispatch(setToolsChepearFirst())
					break;
			}
		}
	}, [limitTools.length, localStorage.getItem('sort'), localStorage.getItem('offset')])

	const updateCategoryOption = (value: string) => {
		setCategorOption(createSelectOption(value))
	}

	const handleSortOptionChange = (selectedOption: SelectOptionType) => {
		setCategorOption(selectedOption)
		switch ((selectedOption as ISelectOption).value) {
			case 'Сheap ones first':
				dispatch(setToolsChepearFirst())
				updateRoteParam('cheap')
				break;
			case 'Expensive ones first':
				dispatch(setToolsExpensiveFirst())
				updateRoteParam('expensive')
				break;
			case 'By popularity':
				dispatch(setToolsByPopularity())
				updateRoteParam('popular')
				break;
		}
	}

	return (
		<Select
			value={categoryOption || createSelectOption('Сheap ones first')}
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