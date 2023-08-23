'use client'
import { useState } from 'react'
import Link from 'next/link';
import { useAppSelector } from '@/store';
import CartHoverCheckedSvg from '@/components/elements/svg/CartHoverCheckedSvg';
import CartHoverSvg from '@/components/elements/svg/CartHoverSvg';
import { formatPrice } from '@/utils/common';
import { ITool } from '@/types/tool';
import styles from '@/styles/catalog/index.module.scss'
import spinnerStyles from '@/styles/spinner/index.module.scss'

const CatalogItem = ({ item }: { item: ITool }) => {
	const theme = useAppSelector(state => state.theme.theme)
	const darkModeClass = theme === 'dark' ? `${styles.dark_mode}` : '';

	const shoppingCart = useAppSelector(state => state.cart.cart)
	const isInCart = shoppingCart.some(cartItem => cartItem.toolId === item.id)

	const [spinner, setSpinner] = useState(false)
	return (
		<li className={`${styles.catalog__list__item} ${darkModeClass}`}>
			<img src={item.images[0]} alt={item.name} />
			<div className={styles.catalog__list__item__inner}>
				<Link href={`/catalog/${item.id}`} passHref legacyBehavior>
					<h3 className={styles.catalog__list__item__title}>{item.name}</h3>
				</Link>
				<span className={styles.catalog__list__item__code}>Vendor code: {item.vendorCode}</span>
				<span className={styles.catalog__list__item__price}>{formatPrice(item.priceOne)} P</span>
			</div>
			<button
				className={`${styles.catalog__list__item__cart} ${isInCart ? styles.added : ''}`}
				disabled={spinner}>
				{spinner ?
					<div className={spinnerStyles.spinner} style={{ top: 6, left: 6 }} />
					:
					<span>{isInCart ? <CartHoverCheckedSvg /> : <CartHoverSvg />}</span>}
			</button>

		</li>
	)
}

export default CatalogItem