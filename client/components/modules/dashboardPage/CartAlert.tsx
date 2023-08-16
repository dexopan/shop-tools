import Link from "next/link";
import { useAppSelector } from "@/store";
import { ICartAlertProps } from "@/types/dashboard"
import { formatPrice } from "@/utils/common";
import styles from '@/styles/dashboard/index.module.scss'

const CartAlert = ({ count, closeAlert }: ICartAlertProps) => {
	const theme = useAppSelector(state => state.theme.theme)
	const darkModeClass = theme === 'dark' ? `${styles.dark_mode}` : '';

	const showCountMessage = (count: number) => {
		if (count === 0) {
			return 'There are no items in the cart'
		} else if (count === 1) {
			return 'There is 1 item in the cart'
		} else {
			return `There are ${count} items in the cart`
		}
	}

	return (
		<>
			<div className={`${styles.dashboard__alert__left} ${darkModeClass}`}>
				<span>{showCountMessage(count)} </span>
				<span>For the amount of {formatPrice(0)} P </span>
			</div>
			<div className={styles.dashboard__alert__right}>
				<Link href="/order" legacyBehavior passHref>
					<a className={styles.dashboard__alert__btn_cart}> Go to cart </a>
				</Link>
				<Link href="/order" legacyBehavior passHref>
					<a className={styles.dashboard__alert__btn_order}> Place an order </a>
				</Link>
			</div>
			<button className={styles.dashboard__alert__btn_close} onClick={closeAlert} />
		</>
	)
}

export default CartAlert