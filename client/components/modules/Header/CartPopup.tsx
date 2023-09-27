'use client';
import { forwardRef, useEffect } from "react"
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion"
import { useAppDispatch, useAppSelector } from '@/store';
import { setCart } from "@/store/cartSlice";
import ShoppingCartSvg from "@/components/elements/svg/shoppingCartSvg";
import { withClickOutside } from "@/utils/withClickOutside";
import { formatPrice } from "@/utils/common";
import { IWrapperComponentProps } from "@/types/common"
import CartPopupItem from "./CartPopupItem";
import { getCartItems } from "@/http/api/cart";
import { toast } from "react-toastify";
import styles from "@/styles/cartPopup/index.module.scss"


const CartPopup = forwardRef<HTMLDivElement, IWrapperComponentProps>(({ open, setOpen }, ref) => {
	const theme = useAppSelector(state => state.theme.theme)
	const darkModeClass = theme === 'dark' ? `${styles.dark_mode}` : '';
	const cart = useAppSelector(state => state.cart.cart)
	const dispatch = useAppDispatch()

	const toggleCartDropdown = () => setOpen(!open)
	const username = localStorage.getItem('username')
	const loadCartItems = async () => {
		try {
			const cartItems = await getCartItems(`/api/basket/${username}`)
			dispatch(setCart(cartItems[0]))
		} catch (error) {
			toast.warning('Something went wrong')
		}
	}

	const isOrderPage = location.pathname === '/order'

	useEffect(() => {
		loadCartItems()
	}, [cart.tools.length])


	return (
		<div className={styles.cart} ref={ref}>
			<button className={`${styles.cart__btn} ${darkModeClass}`} onClick={toggleCartDropdown} disabled={isOrderPage}>
				{(!!cart.tools.length && !isOrderPage) && <span className={styles.cart__btn__count}>{cart.tools.length}</span>}
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
							{cart.tools.length ?
								cart.tools.map((item) => <CartPopupItem key={item.tool.id} item={item} />)
								:
								<li className={styles.cart__popup__empty}>
									<span className={`${styles.cart__popup__empty__text} ${darkModeClass}`}>Cart is empty</span>
								</li>}
						</ul>
						<div className={styles.cart__popup__footer}>
							<div className={styles.cart__popup__footer__total}>
								<span className={`${styles.cart__popup__footer__text} ${darkModeClass}`}>Total order amount:</span>
								<span className={`${styles.cart__popup__footer__price} ${darkModeClass}`}>{formatPrice(cart.totalPrice)} P</span>
							</div>
							<Link href='/order' passHref legacyBehavior>
								<button className={styles.cart__popup__footer__btn} disabled={!cart.tools.length}>Make an order</button>
							</Link>
						</div>
					</motion.ul>}
			</AnimatePresence>

		</div >
	)
})

export default withClickOutside(CartPopup)