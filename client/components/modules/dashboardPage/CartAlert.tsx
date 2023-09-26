import Link from "next/link";
import { useAppSelector } from "@/store";
import { ICartAlertProps } from "@/types/dashboard"
import { formatPrice } from "@/utils/common";
import styles from '@/styles/dashboard/index.module.scss'

const CartAlert = ({ quantity, closeAlert }: ICartAlertProps) => {
	const theme = useAppSelector(state => state.theme.theme)
	const darkModeClass = theme === 'dark' ? `${styles.dark_mode}` : '';
	const cart = useAppSelector(state => state.cart.cart)

	const showCountMessage = (count: number) => {
		if (count === 0) {
			return 'There are no products in the cart'
		} else if (count === 1) {
			return 'There is 1 product in the cart'
		} else {
			return `There are ${count} products in the cart`
		}
	}

	return (
		<>
			<div className={`${styles.dashboard__alert__left} ${darkModeClass}`}>
				<span>{showCountMessage(quantity)} </span>
				<span>For the amount of {formatPrice(cart.totalPrice)} P </span>
			</div>
			<div className={styles.dashboard__alert__right}>
				<Link href="/order" legacyBehavior passHref>
					<a className={`${styles.dashboard__alert__btn_cart} ${darkModeClass}`}> Go to cart </a>
				</Link>
				<Link href="/order" legacyBehavior passHref>
					<a className={`${styles.dashboard__alert__btn_order} ${darkModeClass}`}> Place an order </a>
				</Link>
			</div>
			<button className={`${styles.dashboard__alert__btn_close} ${darkModeClass}`} onClick={closeAlert} />
		</>
	)
}

export default CartAlert