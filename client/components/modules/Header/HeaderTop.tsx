import Link from 'next/link'
import { useAppSelector } from '@/store'
import CityButton from '@/components/elements/cityButton/CityButton'
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
								<a className={`${styles.header__nav__list__item__link} ${darkModeClass}`} onClick={closePopup}>
									Delivery & Payment
								</a>
							</Link>
						</li>
						<li className={styles.header__nav__list__item}>
							<Link href='/about' passHref legacyBehavior >
								<a className={`${styles.header__nav__list__item__link} ${darkModeClass}`} onClick={closePopup}>
									About Us
								</a>
							</Link>
						</li>
						<li className={styles.header__nav__list__item}>
							<Link href='/catalog' passHref legacyBehavior >
								<a className={`${styles.header__nav__list__item__link} ${darkModeClass}`} onClick={closePopup}>
									Catalog
								</a>
							</Link>
						</li>
						<li className={styles.header__nav__list__item}>
							<Link href='/contacts' passHref legacyBehavior >
								<a className={`${styles.header__nav__list__item__link} ${darkModeClass}`} onClick={closePopup}>
									Contacts
								</a>
							</Link>
						</li>
						<li className={styles.header__nav__list__item}>
							<Link href='/wholesale-buyer' passHref legacyBehavior >
								<a className={`${styles.header__nav__list__item__link} ${darkModeClass}`} onClick={closePopup}>
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