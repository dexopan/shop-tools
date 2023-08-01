'use client'

import { useAppDispatch, useAppSelector } from "@/store";
import { toggleTheme } from "@/store/themeSlice";
import styles from '@/styles/togglerTheme/index.module.scss'


export default function TogglerTheme() {
	const dispatch = useAppDispatch()
	const theme = useAppSelector(state => state.theme.theme)

	const handler = () => {
		dispatch(toggleTheme())
	}

	return (
		<div className={styles.theme}>
			<input
				className={styles.theme__input}
				type="checkbox"
				checked={theme === 'light'}
				onChange={handler}
			/>
		</div>
	)
}
