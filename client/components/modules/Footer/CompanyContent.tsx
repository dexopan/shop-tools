import Link from 'next/link'
import styles from '@/styles/footer/index.module.scss'

const CompanyContent = () => {
	return (
		<ul className={styles.footer__top__item__list}>
			<li className={styles.footer__top__item__list__item}>
				<Link href="/about" passHref legacyBehavior>
					<a className={styles.footer__top__item__list__item__link}>About Company</a>
				</Link>
			</li>
			<li className={styles.footer__top__item__list__item}>
				<Link href="/contacts" passHref legacyBehavior>
					<a className={styles.footer__top__item__list__item__link}>Feedback</a>
				</Link>
			</li>
			<li className={styles.footer__top__item__list__item}>
				<Link href="/wholesale-buyer" passHref legacyBehavior>
					<a className={styles.footer__top__item__list__item__link}>Wholesale buyer</a>
				</Link>
			</li>
			<li className={styles.footer__top__item__list__item}>
				<Link href="/contacts" passHref legacyBehavior>
					<a className={styles.footer__top__item__list__item__link}>Contacts</a>
				</Link>
			</li>
		</ul>
	)
}

export default CompanyContent