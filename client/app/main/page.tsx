'use client';

import DashboardPage from "@/components/modules/dashboardPage/DashboardPage";
import useRedirectByUserCheck from "@/hooks/useRedirectByUserCheck";
import { useAppSelector } from '@/store'

export default function Main() {
	const { shouldLoadContent } = useRedirectByUserCheck();
	const theme = useAppSelector(state => state.theme.theme)
	const darkModeClass = theme === 'dark' ? 'dark_mode' : '';
	return (
		<>
			{shouldLoadContent && (
				<main className={darkModeClass}>
					<DashboardPage />
					<div className='overlay'></div>
				</main>
			)}
		</>
	)
}