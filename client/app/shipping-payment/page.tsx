'use client';
import { useAppSelector } from '@/store'
import ShippingPaymentPage from "@/components/modules/ShippingPaymentPage/ShippingPaymentPage";
import useRedirectByUserCheck from "@/hooks/useRedirectByUserCheck";


export default function ShippingPayment() {
	const { shouldLoadContent } = useRedirectByUserCheck();
	const theme = useAppSelector(state => state.theme.theme)
	const darkModeClass = theme === 'dark' ? 'dark_mode' : '';
	return (
		<>
			{shouldLoadContent && (
				<main className={darkModeClass}>
					<ShippingPaymentPage />
					<div className='overlay'></div>
				</main>
			)}
		</>
	)
}