'use client';
import { useAppSelector } from '@/store'
import ContactsPage from '@/components/modules/ContactsPage/ContactsPage';
import useRedirectByUserCheck from "@/hooks/useRedirectByUserCheck";

export default function Contacts() {
	const { shouldLoadContent } = useRedirectByUserCheck();
	const theme = useAppSelector(state => state.theme.theme)
	const darkModeClass = theme === 'dark' ? 'dark_mode' : '';
	return (
		<>
			{shouldLoadContent && (
				<main className={darkModeClass}>
					<ContactsPage />
					<div className='overlay'></div>
				</main>
			)}
		</>
	)
}