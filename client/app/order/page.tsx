'use client';

import { useAppSelector } from '@/store'
import OrderPage from "@/components/modules/OrderPage/OrderPage";
import useRedirectByUserCheck from "@/hooks/useRedirectByUserCheck";

export default function Order() {
	const { shouldLoadContent } = useRedirectByUserCheck();
	const theme = useAppSelector(state => state.theme.theme)
	const darkModeClass = theme === 'dark' ? 'dark_mode' : '';
	return (
		<>
			{shouldLoadContent && (
				<main className={darkModeClass}>
					<OrderPage />
					<div className='overlay'></div>
				</main>
			)}
		</>
	)
}