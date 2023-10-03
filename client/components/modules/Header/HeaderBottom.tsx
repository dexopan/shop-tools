'use client';
import Link from 'next/link';
import { useAppSelector } from '@/store';
import SearchInput from '@/components/elements/header/SearchInput';
import TogglerTheme from '@/components/elements/togglerTheme/togglerTheme';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import CartPopup from './CartPopup';
import styles from '@/styles/header/index.module.scss'

const HeaderBottom = () => {
	const isMedia950 = useMediaQuery(950)
	const theme = useAppSelector(state => state.theme.theme)
	const darkModeClass = theme === 'dark' ? `${styles.dark_mode}` : '';
	return (
		<div className={`${styles.header__bottom} ${darkModeClass}`} >
			<div className={`container ${styles.header__bottom__container} `}>
				<h1 className={styles.header__logo}>
					<Link href='/main' legacyBehavior passHref>
						<a className={styles.header__logo__link}>
							<img src="/img/logo.png" alt="logo" style={{ width: 30, height: 30 }} />
							<span className={`${styles.header__logo__link__text} ${darkModeClass}`}>Tools Store</span>
						</a>
					</Link>
				</h1>
				<div className={styles.header__search}>
					<SearchInput />
				</div>
				<div className={styles.header__shopping_cart}>
					{!isMedia950 && <TogglerTheme />}
					<CartPopup />
				</div>
			</div >
		</div >
	)
}

export default HeaderBottom