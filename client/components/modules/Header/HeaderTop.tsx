import Link from 'next/link'
import CityButton from '@/components/elements/cityButton/CityButton'
import ProfileDropdown from './ProfileDropdown'
import styles from '@/styles/header/index.module.scss'
import TogglerTheme from '@/components/elements/togglerTheme/togglerTheme'

const HeaderTop = () => {
	return (
		<header className={styles.header__top}>
			<div className={`container ${styles.header__top__container}`}>
				<CityButton />
				<nav className={styles.header__nav}>
					<ul className={styles.header__nav__list}>
						<li className={styles.header__nav__list__item}>
							<Link href='/shopping-payment' passHref legacyBehavior >
								<a className={styles.header__nav__list__item__link}>
									Delivery & Payment
								</a>
							</Link>
						</li>
						<li className={styles.header__nav__list__item}>
							<Link href='/about' passHref legacyBehavior >
								<a className={styles.header__nav__list__item__link}>
									About Us
								</a>
							</Link>
						</li>
						<li className={styles.header__nav__list__item}>
							<Link href='/catalog' passHref legacyBehavior >
								<a className={styles.header__nav__list__item__link}>
									Catalog
								</a>
							</Link>
						</li>
						<li className={styles.header__nav__list__item}>
							<Link href='/contacts' passHref legacyBehavior >
								<a className={styles.header__nav__list__item__link}>
									Contacts
								</a>
							</Link>
						</li>
						<li className={styles.header__nav__list__item}>
							<Link href='/wholesale-buyer' passHref legacyBehavior >
								<a className={styles.header__nav__list__item__link}>
									Wholesale buyer
								</a>
							</Link>
						</li>
					</ul>
				</nav>
				<ProfileDropdown />
			</div>
		</header>
	)
}

export default HeaderTop