'use client';
import { useAppSelector } from '@/store'
import AboutPage from '@/components/modules/AboutPage/AboutPage';



export default function About() {
	const theme = useAppSelector(state => state.theme.theme)
	const darkModeClass = theme === 'dark' ? 'dark_mode' : '';
	return (
		<>
			<main className={darkModeClass}>
				<AboutPage />
				<div className='overlay'></div>
			</main>
		</>
	)
}