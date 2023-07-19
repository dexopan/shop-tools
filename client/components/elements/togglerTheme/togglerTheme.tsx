import { useAppDispatch, useAppSelector } from "@/store";
import { toggleTheme } from "@/store/themeSlice";
import style from '@/styles/togglerTheme/index.module.scss'


export default function TogglerTheme() {
	const dispatch = useAppDispatch()
	const theme = useAppSelector(state => state.theme.theme)

	const handler = () => {
		dispatch(toggleTheme())
		document.body.classList.toggle('dark_mode')
	}

	return (
		<div className={style.theme}>
			<input
				className={style.theme__input}
				type="checkbox"
				checked={theme === 'light'}
				onChange={handler}
			/>
		</div>
	)
}
