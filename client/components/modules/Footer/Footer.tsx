import Link from 'next/link'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import FooterLogo from './FooterLogo'
import OnlineStoreContent from './OnlineStoreContent'
import CompanyContent from './CompanyContent'
import MarkerSvg from '@/components/elements/svg/MarkerSvg'
import PhoneSvg from '@/components/elements/svg/PhoneSvg'
import MailSvg from '@/components/elements/svg/MailSvg'
import styles from '@/styles/footer/index.module.scss'
import Accordion from '@/components/elements/accordion/Accordion'

const Footer = () => {
	const isMedia750 = useMediaQuery(750)
	const isMedia500 = useMediaQuery(500)
	return (
		<footer className={styles.footer}>
			<div className={styles.footer__container}>
				<div className={styles.footer__top}>
					{!isMedia750 && <FooterLogo />}
					<div className={styles.footer__top__inner}>
						<div className={styles.footer__top__item}>
							{!isMedia500 && (
								<>
									<h3 className={styles.footer__top__item__title}>Online Store</h3>
									<OnlineStoreContent />
								</>)}
							{isMedia500 && (
								<Accordion
									title="Online Store"
									titleClass={styles.footer__top__item__title}
									arrowOpenClass={styles.open} >
									<OnlineStoreContent />
									<div style={{ height: 17 }}></div>
								</Accordion>)}
						</div>
						<div className={styles.footer__top__item}>
							{!isMedia500 && (
								<>
									<h3 className={styles.footer__top__item__title}>Company</h3>
									<CompanyContent />
								</>)}
							{isMedia500 && (
								<Accordion
									title="Company"
									titleClass={styles.footer__top__item__title}
									arrowOpenClass={styles.open} >
									<CompanyContent />
									<div style={{ height: 17 }}></div>
								</Accordion>)}
						</div>
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
				<div className={styles.footer__bottom}>
					<div className={styles.footer__bottom__block}>
						<div className={styles.footer__bottom__block__left}>
							<h3 className={styles.footer__bottom__block__title}>We accept payment:</h3>
							<ul className={styles.footer__bottom__block__pay}>
								<li className={styles.footer__bottom__block__pay__item}><img src="/img/pay.png" alt="apple-pay" /></li>
								<li className={styles.footer__bottom__block__pay__item}><img src="/img/gpay.png" alt="google-pay" /></li>
								<li className={styles.footer__bottom__block__pay__item}><img src="/img/master-card.png" alt="master-card" /></li>
								<li className={styles.footer__bottom__block__pay__item}><img src="/img/visa.png" alt="visa" /></li>
							</ul>
						</div>
						<div className={styles.footer__bottom__block__right}>
							<h3 className={styles.footer__bottom__block__title}>Our networks:</h3>
							<ul className={styles.footer__bottom__block__social}>
								<li className={styles.footer__bottom__block__social__item}>
									<a href="#" className={styles.footer__bottom__block__social__item_vk} />
								</li>
								<li className={styles.footer__bottom__block__social__item}>
									<a href="#" className={styles.footer__bottom__block__social__item_fb} />
								</li>
								<li className={styles.footer__bottom__block__social__item}>
									<a href="#" className={styles.footer__bottom__block__social__item_inst} />
								</li>
								<li className={styles.footer__bottom__block__social__item}>
									<a href="#" className={styles.footer__bottom__block__social__item_ytb} />
								</li>
							</ul>
						</div>
					</div>
					{isMedia750 && <FooterLogo />}
					<div className={styles.footer__bottom__block}>
						<p className={styles.footer__bottom__block__copyright}>© «Tools Store» 2023.</p>
					</div>
				</div>
			</div>
		</footer >
	)
}

export default Footer