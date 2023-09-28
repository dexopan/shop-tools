import { useState } from 'react';
import { useAppSelector } from '@/store';
import { tab1Text, tab2Text, tab3Text, tab4Text } from '@/utils/shippingPayment';
import styles from "@/styles/shippingPayment/index.module.scss"

const ShippingPaymentPage = () => {
	const theme = useAppSelector(state => state.theme.theme)
	const darkModeClass = theme === 'dark' ? `${styles.dark_mode}` : '';

	const tabText = [tab1Text, tab2Text, tab3Text, tab4Text];
	const [currentTab, setCurrentTab] = useState(tabText[0]);

	return (
		<section className={styles.shipping_payment}>
			<div className='container'>
				<h2 className={`${styles.shipping_payment__title} ${darkModeClass}`}>
					Delivery & Payment
				</h2>
				<div className={`${styles.shipping_payment__tabs} ${darkModeClass}`}>
					<ul className={styles.shipping_payment__tabs__controls}>
						<li className={`${styles.shipping_payment__tabs__controls__item} ${currentTab === tabText[0] ? styles.active : ''} ${darkModeClass}`}>
							<button className={darkModeClass} onClick={() => setCurrentTab(tabText[0])}>
								How courier delivery works?
							</button>
						</li>
						<li className={`${styles.shipping_payment__tabs__controls__item} ${currentTab === tabText[1] ? styles.active : ''} ${darkModeClass}`}>
							<button className={darkModeClass} onClick={() => setCurrentTab(tabText[1])}>
								How to get the goods from the pick-up point?
							</button>
						</li>
						<li className={`${styles.shipping_payment__tabs__controls__item} ${currentTab === tabText[2] ? styles.active : ''} ${darkModeClass}`}>
							<button className={darkModeClass} onClick={() => setCurrentTab(tabText[2])}>
								What are the payment methods?
							</button>
						</li>
						<li className={`${styles.shipping_payment__tabs__controls__item} ${currentTab === tabText[3] ? styles.active : ''} ${darkModeClass}`}>
							<button className={darkModeClass} onClick={() => setCurrentTab(tabText[3])}>
								How to find out the status of the ordered product?
							</button>
						</li>
					</ul>
					<div className={`${styles.shipping_payment__tabs__content} ${darkModeClass}`}>
						<p className={styles.shipping_payment__tabs__content__text}	>
							{currentTab}
						</p>
					</div>
				</div>
			</div>
		</section>
	)
}

export default ShippingPaymentPage