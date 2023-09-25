import { useState } from 'react';
import { useAppSelector } from '@/store';
import OrderAccordion from './OrderAccordion';
import { formatPrice } from '@/utils/common';
import styles from "@/styles/order/index.module.scss"

const OrderPage = () => {
	const theme = useAppSelector(state => state.theme.theme)
	const darkModeClass = theme === 'dark' ? `${styles.dark_mode}` : '';
	const cart = useAppSelector(state => state.cart.cart)
	const [orderIsReady, setOrderIsReady] = useState(false)
	const [agreement, setAgreement] = useState(false)
	const handleAgreementChange = () => setAgreement(!agreement)
	return (
		<section className={styles.order}>
			<div className='container'>
				<h2 className={`${styles.order__title} ${darkModeClass}`}>
					Make an order
				</h2>
				<div className={styles.order__inner}>
					<div className={styles.order__cart}>
						<OrderAccordion showDoneIcon={orderIsReady} setOrderIsReady={setOrderIsReady} />
					</div>
					<div className={styles.order__pay}>
						<h3 className={`${styles.order__pay__title} ${darkModeClass}`}>
							Total amount
						</h3>
						<div className={`${styles.order__pay__inner} ${darkModeClass}`}>
							<div className={styles.order__pay__products}>
								<span>Products ({cart.quantity}) </span>
								<span>{formatPrice(cart.totalPrice)} P</span>
							</div>
							<div className={styles.order__pay__total}>
								<span>For the amount of </span>
								<span className={darkModeClass}>{formatPrice(cart.totalPrice)} P</span>
							</div>
							<button
								disabled={!(agreement && orderIsReady)}
								className={styles.order__pay__btn}>
								Confirm the order
							</button>
							<label className={`${styles.order__pay__rights} ${darkModeClass}`}>
								<input
									className={styles.order__pay__rights__input}
									type="checkbox"
									onChange={handleAgreementChange}
									checked={agreement} />
								<span className={styles.order__pay__rights__text}>
									<strong>I agree</strong> with the terms of use of the trading platform and the refund rules
								</span>
							</label>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default OrderPage