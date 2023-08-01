import Link from 'next/link'
import FooterLogo from './FooterLogo'
import OnlineStoreContent from './OnlineStoreContent'
import CompanyContent from './CompanyContent'
import MarkerSvg from '@/components/elements/svg/MarkerSvg'
import PhoneSvg from '@/components/elements/svg/PhoneSvg'
import MailSvg from '@/components/elements/svg/MailSvg'
import styles from '@/styles/footer/index.module.scss'

const Footer = () => {
	return (
		<footer className={styles.footer}>
			<div className={styles.footer__container}>
				<div className={styles.footer__top}>
					<FooterLogo />
					<div className={styles.footer__inner}>
						<div className={styles.footer__top__item}>
							<h3 className={styles.footer__top__item__title}>Online Store</h3>
							<OnlineStoreContent />
						</div>
						<div className={styles.footer__top__item}>
							<h3 className={styles.footer__top__item__title}>Company</h3>
							<CompanyContent />
						</div>
						<div className={styles.footer__top__item}>
							<h3 className={styles.footer__top__item__title}>Contacts</h3>
							<ul className={`${styles.footer__top__item__list} ${styles.footer__top__item__contacts}`}>
								<li className={styles.footer__top__item__list__item}>
									<Link href="/contacts" passHref legacyBehavior>
										<a className={styles.footer__top__item__list__item__link}>
											<span>Address:</span>
											<span>Moscow, str. Pushkina, 42 </span>
											<span><MarkerSvg /></span>
										</a>
									</Link>
								</li>
								<li className={styles.footer__top__item__list__item}>
									<a href='tel:+71234567890' className={styles.footer__top__item__list__item__link}>
										<span>Contact number:</span>
										<span>+7(123)456-78-90</span>
										<span><PhoneSvg /></span>
									</a>
								</li>
								<li className={styles.footer__top__item__list__item}>
									<a href='mailto:info@tools.com' className={styles.footer__top__item__list__item__link}>
										<span>Email:</span>
										<span>info@tools.com</span>
										<span><MailSvg /></span>
									</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div className={styles.footer__bottom}></div>
			</div>
		</footer >
	)
}

export default Footer