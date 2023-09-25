import { useState } from 'react';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '@/store';
import { setCart } from '@/store/cartSlice';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import CartItemCounter from '@/components/elements/cartItemCounter/CartItemCounter';
import { formatPrice } from '@/utils/common';
import { deleteItemFromCart } from '@/http/api/cart';
import { IShoppingCartItem, } from '@/types/tool'
import spinnerStyles from '@/styles/spinner/index.module.scss'
import styles from '@/styles/order/index.module.scss'


const OrderItem = ({ item }: { item: IShoppingCartItem }) => {
	const theme = useAppSelector(state => state.theme.theme)
	const darkModeClass = theme === 'dark' ? `${styles.dark_mode}` : '';
	const spinnerDarkModeClass = theme === 'dark' ? '' : `${spinnerStyles.dark_mode}`;
	const [spinner, setSpinner] = useState(false)
	const isMedia1160 = useMediaQuery(1160)
	const user = useAppSelector(state => state.user.user)
	const dispatch = useAppDispatch()

	const deleteCartItem = async () => {
		try {
			setSpinner(true)
			const data = await deleteItemFromCart({ url: '/api/basket/delete', userId: user.id, toolId: item.tool.id })
			dispatch(setCart(data))
		} catch (error) {
			toast.error((error as Error).message)
		} finally {
			setSpinner(false)
		}
	}

	return (
		<li className={styles.order__cart__list__item}>
			<div className={styles.order__cart__list__item__left}>
				<div className={styles.order__cart__list__item__left__inner}>
					<div className={styles.order__cart__list__item__img}>
						<img src={item.tool.images[0]} alt={item.tool.name} />
					</div>
					<Link href={`/catalog/${item.tool.id}`} passHref legacyBehavior>
						<a className={`${styles.order__cart__list__item__text} ${darkModeClass}`}>
							<span>{item.tool.name}, {item.tool.manufacturer}, {item.tool.type}</span>
						</a>
					</Link>
				</div>
				{isMedia1160 && (
					item.tool.inStock === 0 ? (
						<span className={styles.order__cart__list__item__empty}>Not in stock</span>
					) : (<CartItemCounter item={item} />)
				)}
			</div>
			<div className={styles.order__cart__list__item__right}>
				{!isMedia1160 && (
					item.tool.inStock === 0 ? (
						<span className={styles.order__cart__list__item__empty}>Not in stock</span>
					) : (<CartItemCounter item={item} />)
				)}
				<span className={`${styles.order__cart__list__item__price} ${darkModeClass}`}>
					{formatPrice(item.price)} P
				</span>
				<button className={styles.order__cart__list__item__delete} onClick={deleteCartItem}>
					{spinner ?
						<span
							className={`${spinnerStyles.spinner} ${spinnerDarkModeClass}`}
							style={{ top: '-13px', left: '-30px', width: 25, height: 25 }} />
						: 'Delete'}
				</button>
			</div>
		</li >
	)
}

export default OrderItem