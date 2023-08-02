import Link from "next/link"
import styles from '@/styles/footer/index.module.scss'

const FooterLogo = () => {
	return (
		<div className={styles.footer__top__item}>
			<Link href="/" passHref legacyBehavior>
				<a className={styles.footer__top__item__logo}>
					<img src='/img/blackWhiteLogo.png' alt="logo" />
					<span className={styles.footer__top__item__logo__text}>Tools Store</span>
				</a>
			</Link>
		</div>
	)
}

export default FooterLogo