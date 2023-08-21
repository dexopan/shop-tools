'use client'
import { useState } from 'react';
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
	const [categoryOption, setCategorOption] = useState<SelectOptionType>(null)
	const dispatch = useAppDispatch()

	const handleSortOptionChange = (selectedOption: SelectOptionType) => {
		setCategorOption(selectedOption)
		switch ((selectedOption as ISelectOption).value) {
			case 'Сheap ones first':
				dispatch(setToolsChepearFirst())
				break;
			case 'Expensive ones first':
				dispatch(setToolsExpensiveFirst())
				break;
			case 'By popularity':
				dispatch(setToolsByPopularity())
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