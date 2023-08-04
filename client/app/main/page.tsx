'use client';

import DashboardPage from "@/components/modules/dashboardPage/DashboardPage";
import { useAppSelector } from '@/store'
export default function Main() {
	const theme = useAppSelector(state => state.theme.theme)
	const darkModeClass = theme === 'dark' ? 'dark_mode' : '';
	return (
		<>
			<main className={darkModeClass}>
				<DashboardPage />
				<div className='overlay'></div>
			</main>
		</>
	)
}