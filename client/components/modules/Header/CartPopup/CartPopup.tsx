'use client';
import { forwardRef } from "react"
import Link from "next/link";
import { useAppSelector } from '@/store';
import { AnimatePresence, motion } from "framer-motion"
import ShoppingCartSvg from "@/components/elements/shoppingCartSvg/shoppingCartSvg";
import { withClickOutside } from "@/utils/withClickOutside";
import { IWrapperComponentProps } from "@/types/common"
import styles from "@/styles/cartPopup/index.module.scss"

const CartPopup = forwardRef<HTMLDivElement, IWrapperComponentProps>(({ open, setOpen }, ref) => {
	const theme = useAppSelector(state => state.theme.theme)
	const darkModeClass = theme === 'dark' ? `${styles.dark_mode}` : '';
	const cart = useAppSelector(state => state.cart.cart)
	const toggleCartDropdown = () => {
		setOpen(!open)
	}

	return (
		<div className={styles.cart} ref={ref}>
			<button className={`${styles.cart__btn} ${darkModeClass}`} onClick={toggleCartDropdown}>
				{!!cart.length && <span className={styles.cart__btn__count}>{cart.length}</span>}
				<span className={styles.cart__svg}>
					<ShoppingCartSvg />
				</span>
				<span className={styles.cart__text}>Cart</span>
			</button>
			<AnimatePresence>
				{open &&
					<motion.ul
						initial={{ opacity: 0, scale: 0 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0 }}
						className={`${styles.cart__popup} ${darkModeClass}`}
						style={{ transformOrigin: 'right-top' }}>
						<h3 className={`${styles.cart__popup__title}  ${darkModeClass}`}>Shopping Cart</h3>
						<ul className={styles.cart__popup__list}>
							{cart.length ?
								cart.map((item) => <li key={item.id}> </li>)
								:
								<li className={styles.cart__popup__empty}>
									<span className={`${styles.cart__popup__empty__text} ${darkModeClass}`}>Cart is empty</span>
								</li>}
						</ul>
						<div className={styles.cart__popup__footer}>
							<div className={styles.cart__popup__footer__total}>
								<span className={`${styles.cart__popup__footer__text} ${darkModeClass}`}>Total amount of the order:</span>
								<span className={`${styles.cart__popup__footer__price} ${darkModeClass}`}>0</span>
							</div>
							<Link href='/order' passHref legacyBehavior>
								<button className={styles.cart__popup__footer__btn} disabled={!cart.length}>Make an order</button>
							</Link>
						</div>
					</motion.ul>}
			</AnimatePresence>

		</div >
	)
})

export default withClickOutside(CartPopup)