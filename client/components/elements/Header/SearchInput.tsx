'use client'
import { useState } from 'react';
import Select from 'react-select';
import { useAppSelector } from '@/store';
import { SelectOptionType } from '@/types/common';
import { controlStyles, menuStyles, inputStyles, optionStyles } from '@/styles/searchInput';

const SearchInput = () => {
	const theme = useAppSelector(state => state.theme.theme)
	const [searchOption, setSearchOption] = useState<SelectOptionType>(null)

	const handleSearchOptionChange = (selectedOption: SelectOptionType) => {
		setSearchOption(selectedOption)
	}


	return (
		<Select
			placeholder='Search...'
			value={searchOption}
			onChange={handleSearchOptionChange}
			styles={{
				...inputStyles,
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
			isClearable={true}
			openMenuOnClick={false}
			options={[1, 2, 3, 4, 5].map((item) => ({ value: item, label: `Option ${item}` }))}
		/>
	)
}

export default SearchInput
