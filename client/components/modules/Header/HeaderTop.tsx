import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAppSelector } from '@/store'
import CityButton from '@/components/elements/header/CityButton'
import TogglerTheme from '@/components/elements/togglerTheme/togglerTheme'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { usePopup } from '@/hooks/usePopup'
import ProfileDropdown from './ProfileDropdown'
import styles from '@/styles/header/index.module.scss'

const HeaderTop = () => {
	const isMedia950 = useMediaQuery(950)
	const { open, toggleOpen, closePopup } = usePopup()
	const theme = useAppSelector(state => state.theme.theme)
	const darkModeClass = theme === 'dark' ? `${styles.dark_mode}` : '';
	const path = usePathname()

	return (
		<div className={styles.header__top}>
			<div className={`container ${styles.header__top__container}`}>
				{!isMedia950 && <CityButton />}
				{isMedia950 && (
					<button className={`${styles.burger_menu} ${open ? styles.open : ''} ${darkModeClass}`} onClick={toggleOpen}>
						<span />
						<span />
						<span />
					</button>
				)}
				<nav className={`${styles.header__nav} ${open ? styles.open : ''} ${darkModeClass}`}>
					<ul className={styles.header__nav__list}>
						<li className={styles.header__nav__list__item}>
							<Link href='/shipping-payment' passHref legacyBehavior >
								<a className={`${styles.header__nav__list__item__link} ${darkModeClass} ${path === '/shipping-payment' ? styles.active : ''}`}
									onClick={closePopup}>
									Delivery & Payment
								</a>
							</Link>
						</li>
						<li className={styles.header__nav__list__item}>
							<Link href='/about' passHref legacyBehavior >
								<a className={`${styles.header__nav__list__item__link} ${darkModeClass} ${path === '/about' ? styles.active : ''}`}
									onClick={closePopup}>
									About Us
								</a>
							</Link>
						</li>
						<li className={styles.header__nav__list__item}>
							<Link href='/catalog' passHref legacyBehavior >
								<a className={`${styles.header__nav__list__item__link} ${darkModeClass} ${path === '/catalog' ? styles.active : ''}`}
									onClick={closePopup}>
									Catalog
								</a>
							</Link>
						</li>
						<li className={styles.header__nav__list__item}>
							<Link href='/contacts' passHref legacyBehavior >
								<a className={`${styles.header__nav__list__item__link} ${darkModeClass} ${path === '/contacts' ? styles.active : ''}`}
									onClick={closePopup}>
									Contacts
								</a>
							</Link>
						</li>
						<li className={styles.header__nav__list__item}>
							<Link href='/wholesale-buyer' passHref legacyBehavior >
								<a className={`${styles.header__nav__list__item__link} ${darkModeClass} ${path === '/wholesale-buyer' ? styles.active : ''}`}
									onClick={closePopup}>
									Wholesale buyer
								</a>
							</Link>
						</li>
						{isMedia950 && (<li className={styles.header__nav__list__item}>
							<CityButton />
						</li>)}
						{isMedia950 && (<li className={styles.header__nav__list__item}>
							<TogglerTheme />
						</li>)}
					</ul>
				</nav>
				<ProfileDropdown />
			</div>
		</div>
	)
}

export default HeaderTop