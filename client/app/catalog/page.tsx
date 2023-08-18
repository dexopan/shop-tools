'use client';

import { useAppSelector } from '@/store'
import CatalogPage from "@/components/modules/CatalogPage/CatalogPage";
import useRedirectByUserCheck from "@/hooks/useRedirectByUserCheck";

export default function Catalog() {
	const { shouldLoadContent } = useRedirectByUserCheck();
	const theme = useAppSelector(state => state.theme.theme)
	const darkModeClass = theme === 'dark' ? 'dark_mode' : '';
	return (
		<>
			{shouldLoadContent && (
				<main className={darkModeClass}>
					<CatalogPage />
					<div className='overlay'></div>
				</main>
			)}
		</>
	)
}