import { useState } from 'react';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '@/store';
import { setCart } from '@/store/cartSlice';
import { formatPrice } from '@/utils/common';
import DeleteSvg from '@/components/elements/svg/DeleteSvg';
import CartItemCounter from '@/components/elements/cartItemCounter/CartItemCounter';
import { deleteItemFromCart } from '@/http/api/cart';
import { IShoppingCartItem, } from '@/types/tool'
import spinnerStyles from '@/styles/spinner/index.module.scss'
import styles from '@/styles/cartPopup/index.module.scss'

const CartPopupItem = ({ item }: { item: IShoppingCartItem }) => {
	const theme = useAppSelector(state => state.theme.theme)
	const darkModeClass = theme === 'dark' ? `${styles.dark_mode}` : '';
	const spinnerDarkModeClass = theme === 'dark' ? '' : `${spinnerStyles.dark_mode}`;
	const [spinner, setSpinner] = useState(false)
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
		<li className={styles.cart__popup__list__item}>
			<div className={styles.cart__popup__list__item__top}>
				<div className={styles.cart__popup__list__item__img}>
					<img src={item.tool.images[0]} alt={item.tool.name} />
				</div>
				<Link href={`/catalog/${item.tool.id}`} passHref legacyBehavior>
					<a className={`${styles.cart__popup__list__item__text} ${darkModeClass}`}>
						<span>{item.tool.name}, {item.tool.manufacturer}, {item.tool.type}</span>
					</a>
				</Link>
				<button onClick={deleteCartItem}>
					<span>
						{spinner ?
							<span
								className={`${spinnerStyles.spinner} ${spinnerDarkModeClass}`}
								style={{ top: 0, left: 0, width: 20, height: 20 }} />
							: <DeleteSvg />}
					</span>
				</button>
			</div>
			<div className={styles.cart__popup__list__item__bottom}>
				{item.tool.inStock === 0 ? (
					<span className={styles.cart__popup__list__item__empty}>Out of stock</span>
				) : (
					<CartItemCounter item={item} />
				)}
				<span className={`${styles.cart__popup__list__item__price} ${darkModeClass}`}>
					{formatPrice(item.price)} P
				</span>
			</div>
		</li>
	)
}

export default CartPopupItem