'use client';
import { useAppSelector } from '@/store'
import AboutPage from '@/components/modules/AboutPage/AboutPage';
import useRedirectByUserCheck from "@/hooks/useRedirectByUserCheck";


export default function About() {
	const { shouldLoadContent } = useRedirectByUserCheck();
	const theme = useAppSelector(state => state.theme.theme)
	const darkModeClass = theme === 'dark' ? 'dark_mode' : '';
	return (
		<>
			{shouldLoadContent && (
				<main className={darkModeClass}>
					<AboutPage />
					<div className='overlay'></div>
				</main>
			)}
		</>
	)
}