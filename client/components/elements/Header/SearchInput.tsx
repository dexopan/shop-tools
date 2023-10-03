'use client'
import { useState } from 'react';
import Select from 'react-select';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/store';
import SearchSvg from '../svg/SearchSvg';
import { createSelectOption } from '@/utils/common';
import { useDebounceCallback } from '@/hooks/useDebounceCallback';
import { getToolsByName, getToolsBySearch } from '@/http/api/tools';
import { ISelectOption, SelectOptionType } from '@/types/common';
import { ITool } from '@/types/tool';
import { controlStyles, menuStyles, inputStyles, optionStyles } from '@/styles/searchInput';
import styles from '@/styles/header/index.module.scss'

const SearchInput = () => {
	const theme = useAppSelector(state => state.theme.theme)
	const darkModeClass = theme === 'dark' ? `${styles.dark_mode}` : '';
	const [searchOption, setSearchOption] = useState<SelectOptionType>(null)
	const [options, setOptions] = useState([])
	const router = useRouter()
	const delayCallback = useDebounceCallback(1000)

	const searchTools = async (search: string) => {
		try {
			const data = await getToolsBySearch({ url: '/api/tool/search', search })
			const names = data.map((item: ITool) => item.name).map(createSelectOption)
			setOptions(names)
		} catch (error) {
			toast.error((error as Error).message)
		}
	}

	const onSearchInputChange = (text: string) => {
		delayCallback(() => searchTools(text))
	}

	const getToolAndRedirect = async (name: string) => {
		try {
			const tool = await getToolsByName({ url: '/api/tool/name', name })
			router.push(`/catalog/${tool[0].id}`)
			setSearchOption(null)
		} catch (error) {
			toast.error((error as Error).message)
		}
	}

	const handleSearchOptionChange = (selectedOption: SelectOptionType) => {
		const name = (selectedOption as ISelectOption)?.value as string
		if (name) {
			getToolAndRedirect(name)
			return
		}
		setSearchOption(selectedOption)
	}

	return (
		<>
			<div className={styles.header__search__inner}>
				<Select
					id='input'
					placeholder='Search...'
					value={searchOption}
					onChange={handleSearchOptionChange}
					styles={{
						...inputStyles,
						control: (defState) => ({
							...controlStyles(defState, theme),
							backgroundColor: theme === 'dark' ? '#2d2d2d' : '#ffffff',
							transition: 'none'
						}),
						input: (defState) => ({
							...defState,
							color: theme === 'dark' ? '#f2f2f2' : '#222222',
						}),
						menu: (defState) => ({
							...menuStyles(defState, theme),
							marginTop: '0'
						}),
						option: (defState, state) => ({
							...optionStyles(defState, state, theme),
						}),
					}}
					isClearable={true}
					openMenuOnClick={false}
					onInputChange={onSearchInputChange}
					options={options}
				/>
			</div>
			<button className={`${styles.header__search__btn} ${darkModeClass}`}>
				<span className={styles.header__search__btn__span}> <SearchSvg /> </span>
			</button>
		</>
	)
}

export default SearchInput
