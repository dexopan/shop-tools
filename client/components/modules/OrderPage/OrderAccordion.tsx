import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useAppSelector } from '@/store'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import DoneSvg from '@/components/elements/svg/DoneSvg'
import EditSvg from '@/components/elements/svg/EditSvg'
import CartPopupItem from '../Header/CartPopupItem'
import OrderItem from './OrderItem'
import { formatPrice } from '@/utils/common'
import { IOrderAccordionProps } from '@/types/order'
import styles from "@/styles/order/index.module.scss"

const OrderAccordion = ({ setOrderIsReady, showDoneIcon }: IOrderAccordionProps) => {
	const theme = useAppSelector(state => state.theme.theme)
	const darkModeClass = theme === 'dark' ? `${styles.dark_mode}` : '';
	const isMedia550 = useMediaQuery(550)
	const cart = useAppSelector(state => state.cart.cart)
	const [expanded, setExpanded] = useState(true);

	const openAccordion = () => {
		setOrderIsReady(false)
		setExpanded(true)
	}

	const closeAccordion = () => {
		setOrderIsReady(true)
		setExpanded(false)
	}
	return (
		<>
			<motion.div
				initial={false}
				className={`${styles.order__cart__title} ${darkModeClass}`}
			>
				<h3 className={`${styles.order__cart__title__text} ${darkModeClass}`}>
					{showDoneIcon && (<span><DoneSvg /></span>)}
					Shopping cart
				</h3>
				<button className={styles.order__cart__title__btn} onClick={openAccordion}>
					<span>
						<EditSvg />
					</span>
					{isMedia550 ? '' : 'Edit'}
				</button>
			</motion.div>
			<AnimatePresence initial={false}>
				{expanded && (
					<motion.div
						key="content"
						initial="collapsed"
						animate="open"
						exit="collapsed"
						variants={{
							open: { opacity: 1, height: "auto" },
							collapsed: { opacity: 0, height: 0 }
						}}
						style={{ overflow: "hidden" }}
						transition={{ duration: 0.8, ease: [0.5, 0.62, 0.23, 0.98] }}
					>
						<div className={`${styles.order__cart__content} ${darkModeClass}`}>
							<ul className={styles.order__cart__list}>
								{cart.tools.length ? cart.tools.map((item) => (isMedia550 ?
									<CartPopupItem key={item.tool.id} item={item} />
									:
									<OrderItem item={item} key={item.tool.id} />))
									:
									<li className={styles.order__cart__empty}>
										<span className={`${styles.order__cart__empty__text} ${darkModeClass}`}>
											Your cart is empty
										</span>
									</li>}
							</ul>
							<div className={styles.order__cart__footer}>
								<div className={styles.order__cart__footer__total}>
									<span className={`${styles.order__cart__footer__text} ${darkModeClass}`}>Total order amount:</span>
									<span className={`${styles.order__cart__footer__price} ${darkModeClass}`}>{formatPrice(cart.totalPrice)} P</span>
								</div>
								<button className={styles.order__cart__footer__btn} onClick={closeAccordion} disabled={!cart.tools.length}>
									Continue
								</button>
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	)
}

export default OrderAccordion