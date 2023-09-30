import { useAppSelector } from '@/store';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import MailSvg from '@/components/elements/svg/MailSvg';
import FeedbackForm from '../FeedbackForm/FeedbackForm';
import styles from "@/styles/contacts/index.module.scss"

const ContactsPage = ({ isWholesaleBuyerPage = false }) => {
	const theme = useAppSelector(state => state.theme.theme)
	const darkModeClass = theme === 'dark' ? `${styles.dark_mode}` : '';
	const isMedia560 = useMediaQuery(560)
	return (
		<section className={styles.contacts}>
			<div className='container'>
				<h2 className={`${styles.contacts__title} ${darkModeClass}`}>
					{isWholesaleBuyerPage ? 'Wholesale Buyer' : 'Contacts'}
				</h2>
				<div className={styles.contacts__inner}>
					{isWholesaleBuyerPage ? (
						<div className={`${styles.contacts__list} ${darkModeClass}`}>
							<p>
								<span>
									The terms of wholesale orders are decided individually by phone:{' '}
								</span>
								<span>+7 (123) 456-78-90</span>
							</p>
							<p>
								Or describe the essence of the order in the feedback form and we will contact you.
							</p>
						</div>
					) : (
						<ul className={`${styles.contacts__list} ${darkModeClass}`}>
							<li className={styles.contacts__list__title}>
								<h3 className={darkModeClass}>
									Tools Store
								</h3>
							</li>
							<li className={`${styles.contacts__list__item} ${darkModeClass}`}>
								<span>Office: </span>
								<span>Moscow, str. Pushkin, 42</span>
							</li>
							<li className={`${styles.contacts__list__item} ${darkModeClass}`}>
								<span>Warehouse: </span>
								<span> Moscow, str. Dostoevsky, 10</span>
							</li>
							<li className={`${styles.contacts__list__item} ${darkModeClass}`}>
								<span>Office opening hours: </span>
								<span> mon-fri: from 8:00 to 20:00</span>
							</li>
							<li className={`${styles.contacts__list__item} ${darkModeClass}`}>
								<span>Our contact phone number: </span>
								<span> +7 (123) 456-78-90</span>
							</li>
							<li className={`${styles.contacts__list__item} ${darkModeClass}`}>
								<span>Time of receiving orders: </span>
								<span> mon-sun: from 8:00 to 20:00</span>
							</li>
							<li className={`${styles.contacts__list__item} ${darkModeClass}`}>
								<span>Accepting orders electronically on the website: </span>
								<span> around the clock</span>
							</li>
							<li className={`${styles.contacts__list__item} ${darkModeClass}`}>
								<span>E-mail: </span>
								<span className={styles.contacts__list__item__mail}>
									{!isMedia560 && <MailSvg />}
									<span>info@tools.com</span>
								</span>
							</li>
						</ul>
					)}
					<FeedbackForm />
				</div>
			</div>
		</section>
	)
}

export default ContactsPage