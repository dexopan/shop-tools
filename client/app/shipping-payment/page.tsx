'use client';

import { useAppSelector } from '@/store'
import ShippingPaymentPage from "@/components/modules/ShippingPaymentPage/ShippingPaymentPage";


export default function ShippingPayment() {

	const theme = useAppSelector(state => state.theme.theme)
	const darkModeClass = theme === 'dark' ? 'dark_mode' : '';
	return (
		<>
			<main className={darkModeClass}>
				<ShippingPaymentPage />
				<div className='overlay'></div>
			</main>
		</>
	)
}