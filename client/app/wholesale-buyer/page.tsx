'use client';
import { useAppSelector } from '@/store'
import ContactsPage from '@/components/modules/ContactsPage/ContactsPage';
import useRedirectByUserCheck from "@/hooks/useRedirectByUserCheck";

export default function WholesaleBuyer() {
	const { shouldLoadContent } = useRedirectByUserCheck();
	const theme = useAppSelector(state => state.theme.theme)
	const darkModeClass = theme === 'dark' ? 'dark_mode' : '';
	return (
		<>
			{shouldLoadContent && (
				<main className={darkModeClass}>
					<ContactsPage isWholesaleBuyerPage={true} />
					<div className='overlay'></div>
				</main>
			)}
		</>
	)
}