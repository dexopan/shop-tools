import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '@/store';
import { setCart } from '@/store/cartSlice';
import { setToolWithLimit } from '@/store/toolSlice';
import { formatPrice } from '@/utils/common';
import { addItemToCart, deleteItemFromCart } from '@/http/api/cart';
import { getToolsWithLimit } from '@/http/api/tools';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import ToolImagesList from './ToolImagesList';
import ToolTabs from './ToolTabs';
import CartHoverCheckedSvg from '@/components/elements/svg/CartHoverCheckedSvg';
import CartHoverSvg from '@/components/elements/svg/CartHoverSvg';
import DashboardSlider from '../dashboardPage/DashboardSlider';
import ToolAccordion from './ToolAccordion';
import spinnerStyles from '@/styles/spinner/index.module.scss'
import styles from "@/styles/tool/index.module.scss"


const ToolPage = () => {
	const theme = useAppSelector(state => state.theme.theme)
	const darkModeClass = theme === 'dark' ? `${styles.dark_mode}` : '';
	const tool = useAppSelector(state => state.tools.oneTool)
	const cart = useAppSelector(state => state.cart.cart)
	const user = useAppSelector(state => state.user.user)
	const limitTools = useAppSelector(state => state.tools.limitTools)
	const isInCart = cart.tools.some(cartItem => cartItem.tool.id === tool.id)
	const [spinnerToggleCart, setSpinnerToggleCart] = useState(false)
	const [spinnerSlider, setSpinnerSlider] = useState(false)
	const dispatch = useAppDispatch()
	const isMobile = useMediaQuery(850)

	const toggleCartItem = async () => {
		try {
			setSpinnerToggleCart(true)
			if (isInCart) {
				const data = await deleteItemFromCart({ url: '/api/basket/delete', userId: user.id, toolId: tool.id })
				dispatch(setCart(data))
				return
			}
			const data = await addItemToCart({ url: '/api/basket/add', userId: user.id, toolId: tool.id })
			dispatch(setCart(data))
		} catch (error: any) {
			toast.error((error as Error).message)
		} finally {
			setSpinnerToggleCart(false)
		}
	}

	useEffect(() => {
		loadTools()
	}, [])

	const loadTools = async () => {
		try {
			setSpinnerSlider(true)
			const data = await getToolsWithLimit('/api/tool?limit=10&offset=0&sort=popular&manufacturers=&typesTools=')
			dispatch(setToolWithLimit(data))
		} catch (error) {
			toast.error((error as Error).message)
		} finally {
			setSpinnerSlider(false)
		}
	}

	return (
		<section className={styles.tool}>
			<div className='container'>
				<div className={`${styles.tool__top} ${darkModeClass}`}>
					<h2 className={`${styles.tool__title} ${darkModeClass}`}>
						{tool.name}
					</h2>
					<div className={styles.tool__inner}>
						<ToolImagesList />
						<div className={styles.tool__info}>
							<span className={`${styles.tool__info__price} ${darkModeClass}`}>
								{formatPrice(tool.priceOne || 0)} P
							</span>
							<span className={styles.tool__info__stock}>
								{tool.inStock ?
									<span className={styles.tool__info__stock__success}>In stock</span> :
									<span className={styles.tool__info__stock__not}>Not in stock</span>
								}
							</span>
							<span className={`${styles.tool__info__code} ${darkModeClass}`}>
								Vendor code: {tool.vendorCode}
							</span>
							<button className={`${styles.tool__info__btn} ${isInCart ? styles.in_cart : ''}`} onClick={toggleCartItem}>
								{spinnerToggleCart ?
									<span className={spinnerStyles.spinner} style={{ top: 10, left: '45%' }} />
									:
									<>
										<span className={styles.tool__info__btn__icon}>
											{isInCart ? <CartHoverCheckedSvg /> : <CartHoverSvg />}
										</span>
										<span>
											{isInCart ? 'In cart' : 'Add to cart'}
										</span>
									</>}
							</button>
							{!isMobile && <ToolTabs />}
						</div>
					</div>
				</div>
				{isMobile && (
					<div className={styles.tool__accordion}>
						<div className={styles.tool__accordion__inner}>
							<ToolAccordion title='Description'>
								<div className={`${styles.tool__accordion__content} ${darkModeClass}`}>
									<h3 className={`${styles.tool__tabs__content__title} ${darkModeClass}`}>
										{tool.name}
									</h3>
									<p className={`${styles.tool__tabs__content__text} ${darkModeClass}`}>
										{tool.description}
									</p>
								</div>
							</ToolAccordion>
						</div>
						<ToolAccordion title='Characteristics'>
							<div className={`${styles.tool__accordion__content} ${darkModeClass}`}>
								<p className={`${styles.tool__tabs__content__text} ${darkModeClass}`}>
									{tool.vendorCode}
								</p>
							</div>
						</ToolAccordion>
					</div>
				)}
				<div>
					<h2 className={`${styles.tool__title}  ${darkModeClass}`}>
						You will like it
					</h2>
					<DashboardSlider items={limitTools} goToToolPage={true} spinner={spinnerSlider} />
				</div>
			</div>
		</section>
	)
}

export default ToolPage