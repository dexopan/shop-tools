'use client'
import { useState } from 'react';
import Select from 'react-select';
import { useAppSelector } from '@/store';
import { createSelectOption } from '@/utils/common';
import { SelectOptionType } from '@/types/common';
import { selectStyles, controlStyles, menuStyles } from '@/styles/catalog/select';
import { optionStyles } from '@/styles/searchInput';
import { categoriesOption } from '@/utils/selectContent';

const FilterSelect = () => {
	const theme = useAppSelector(state => state.theme.theme)
	const [categoryOption, setCategorOption] = useState<SelectOptionType>(null)

	const handleSearchOptionChange = (selectedOption: SelectOptionType) => {
		setCategorOption(selectedOption)
	}


	return (
		<Select
			value={categoryOption || createSelectOption('Сheap ones first')}
			onChange={handleSearchOptionChange}
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