import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '@/store';
import { updateCart } from '@/store/cartSlice';
import { addItemToCart, removeItemFromCart } from '@/http/api/cart';
import MinusSvg from '../svg/MinusSvg';
import PlusSvg from '../svg/PlusSvg';
import { IShoppingCartItem } from '@/types/tool';
import spinnerStyles from '@/styles/spinner/index.module.scss'
import styles from '@/styles/cartPopup/index.module.scss'


const CartItemCounter = ({ item }: { item: IShoppingCartItem }) => {
	const theme = useAppSelector(state => state.theme.theme)
	const darkModeClass = theme === 'dark' ? `${styles.dark_mode}` : '';
	const spinnerDarkModeClass = theme === 'dark' ? '' : `${spinnerStyles.dark_mode}`;
	const user = useAppSelector(state => state.user.user)
	const [spinner, setSpinner] = useState(false)

	const [disableIncrease, setDisableIncrease] = useState(false)
	const dispatch = useAppDispatch()

	useEffect(() => {
		if (item.count === item.tool.inStock) {
			setDisableIncrease(true)
		} else {
			setDisableIncrease(false)
		}
	}, [item.count])

	const decrease = async () => {
		try {
			setSpinner(true)
			const data = await removeItemFromCart({ url: '/api/basket/remove', userId: user.id, toolId: item.tool.id })
			dispatch(updateCart(data))
		}
		catch (error) {
			toast.error((error as Error).message)
		} finally {
			setSpinner(false)
		}
	}

	const increase = async () => {
		try {
			setSpinner(true)
			const data = await addItemToCart({ url: '/api/basket/add', userId: user.id, toolId: item.tool.id })
			dispatch(updateCart(data))
		} catch (error) {
			toast.error((error as Error).message)
		} finally {
			setSpinner(false)
		}
	}

	return (
		<div className={`${styles.cart__popup__list__item__counter} ${darkModeClass}`}>
			<button onClick={decrease} className={styles.cart__svg}><MinusSvg /></button>
			<span>{spinner ?
				<span
					className={`${spinnerStyles.spinner} ${spinnerDarkModeClass}`}
					style={{ top: 4, left: 33, width: 20, height: 20 }}
				/>
				: item.count}
			</span>
			<button disabled={disableIncrease} onClick={increase} className={styles.cart__svg}><PlusSvg /></button>
		</div>
	)
}

export default CartItemCounter