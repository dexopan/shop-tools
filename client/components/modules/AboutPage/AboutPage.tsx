import { useAppSelector } from "@/store";
import styles from "@/styles/about/index.module.scss"

const AboutPage = () => {
	const theme = useAppSelector(state => state.theme.theme)
	const darkModeClass = theme === 'dark' ? `${styles.dark_mode}` : '';
	return (
		<section className={styles.about}>
			<div className='container'>
				<h2 className={`${styles.about__title} ${darkModeClass}`}>
					About Us
				</h2>
				<div className={styles.about__inner}>
					<div className={`${styles.about__info} ${darkModeClass}`}>
						<p>
							Lorem, ipsum dolor sit amet consectetur adipisicing elit. Asperiores, quae!
							Labore rerum est sapiente nesciunt vel aspernatur cumque ab, amet error
							exercitationem enim laborum, sint porro sit omnis iste ea!
						</p>
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum tenetur,
							nemo ab velit rem ratione, aspernatur reiciendis illo, dicta itaque harum!
							Cupiditate in debitis voluptatibus voluptatum. Laborum, ipsam natus doloribus
							iure voluptates nisi veritatis accusantium ullam ut, nihil magni alias!
						</p>
					</div>
					<div className={`${styles.about__img} ${styles.about__img__top}`}>
						<img src="/img/about1.jpg" alt="image-1" />
					</div>
					<div className={`${styles.about__img} ${styles.about__img__top}`}>
						<img src="/img/about2.jpg" alt="image-2" />
					</div>
				</div>
			</div>
		</section>
	)
}

export default AboutPage