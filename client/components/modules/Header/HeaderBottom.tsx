import SearchInput from '@/components/elements/Header/SearchInput';
import SearchSvg from '@/components/elements/searchSvg/SearchSvg';
import TogglerTheme from '@/components/elements/togglerTheme/togglerTheme';
import { useAppSelector } from '@/store';
import styles from '@/styles/header/index.module.scss'
import Link from 'next/link';

const HeaderBottom = () => {
	const theme = useAppSelector(state => state.theme.theme)
	const darkModeClass = theme === 'dark' ? `${styles.dark_mode}` : '';
	return (
		<div className={styles.header__bottom}>
			<div className={`container ${styles.header__bottom__container}`}>
				<h1 className={styles.header__logo}>
					<Link href='/' legacyBehavior passHref>
						<a className={styles.header__logo__link}>
							<img src="/img/logo.png" alt="logo" style={{ width: 30, height: 30 }} />
							<span className={`${styles.header__logo__link__text} ${darkModeClass}`}>Tools Store</span>
						</a>
					</Link>
				</h1>
				<div className={styles.header__search}>
					<SearchInput />
					<button>
						<span className={styles.header__search__btn}> <SearchSvg /> </span>
					</button>
				</div>
				<div className=''>
					<TogglerTheme />
					<button className={styles.header__shopping_cart}>Basket</button>
				</div>
			</div >
		</div >

	)
}

export default HeaderBottom