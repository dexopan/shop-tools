import { CSSObjectWithLabel, GroupBase, OptionProps, StylesConfig } from "react-select";
import { ISelectOption } from "@/types/common";


export const controlStyles = (
	defaultStyles: CSSObjectWithLabel,
	theme: string | null
) => ({
	...defaultStyles,
	cursor: 'pointer',
	backgroundColor: 'transparent',
	border: '1px solid #9E9E9E',
	height: '40px',
	boxShadow: 'none',
	borderRadius: '4px',
	'&:hover': {
		borderColor: '#9E9E9E',
	},
	'& .css-1dimb5e-singleValue': {
		color: theme === 'dark' ? '#f2f2f2' : '#222222',
	},
	borderRight: 'none',
	borderTopRightRadius: 0,
	borderBottomRightRadius: 0,
})

export const menuStyles = (
	defaultStyles: CSSObjectWithLabel,
	theme: string | null
) => ({
	...defaultStyles,
	boxShadow: 'none',
	borderRadius: '4px',
	border: 'none',
	height: 'auto',
	overflow: 'hidden',
	backgroundColor: theme === 'dark' ? '#2d2d2d' : '#ffffff',
	width: 'calc(100% + 40px)',
	minHeight: 30,
})

export const optionStyles = (
	defStyles: CSSObjectWithLabel,
	state: OptionProps<ISelectOption, boolean, GroupBase<ISelectOption>>,
	theme: string | null,
) => {
	const backgroundHoverForLightMode = state.isSelected
		? state.isSelected
			? '#9e9e9e'
			: '#f2f2f2'
		: state.isSelected
			? '#f2f2f2'
			: '#9e9e9e'

	const backgroundHoverForDarkMode = state.isSelected
		? state.isSelected
			? '#f2f2f2'
			: '#9e9e9e'
		: state.isSelected
			? '#9e9e9e'
			: '#f2f2f2'

	const colorHoverForLightMode = state.isSelected
		? state.isSelected
			? '#f2f2f2'
			: '#9e9e9e'
		: state.isSelected
			? '#9e9e9e'
			: '#f2f2f2'

	const colorHoverForDarkMode = state.isSelected
		? state.isSelected
			? '#9e9e9e'
			: '#f2f2f2'
		: state.isSelected
			? '#f2f2f2'
			: '#9e9e9e'

	return {
		...defStyles,
		cursor: 'pointer',
		padding: '6px 12px',
		margin: 0,
		'&:hover': {
			backgroundColor: theme === 'dark' ? backgroundHoverForDarkMode : backgroundHoverForLightMode,
			color: theme === 'dark' ? colorHoverForDarkMode : colorHoverForLightMode,
		},
		backgroundColor:
			theme === 'dark'
				? state.isSelected
					? '#ffffff'
					: '#2d2d2d'
				: state.isSelected
					? '#2d2d2d'
					: '#ffffff',
		color:
			theme === 'dark'
				? state.isSelected
					? '#222222'
					: '#f2f2f2'
				: state.isSelected
					? '#f2f2f2'
					: '#222222',
	}
}


export const inputStyles: StylesConfig<ISelectOption, boolean, GroupBase<ISelectOption>> = {
	indicatorSeparator: () => ({
		border: "none",
	}),
	dropdownIndicator: () => ({
		display: "none",
	}),
	menuList: (defStyles) => ({
		...defStyles,
		paddingTop: 0,
		paddingBottom: 0,
		minHeight: 30,
		'&::-webkit-scrollbar': {
			width: '8px',
		},
		'&::-webkit-scrollbar-track': {
			background: 'transparent',
		},
		'&::-webkit-scrollbar-thumb': {
			background: '#454545',
			borderRadius: '3px',
		},
		'&::-webkit-scrollbar-thumb:hover': {
			background: 'grey',
		}
	}),
	placeholder: (defStyles) => ({
		...defStyles,
		color: '#b9babb',
	}),
}
