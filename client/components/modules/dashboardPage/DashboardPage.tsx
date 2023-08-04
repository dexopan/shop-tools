'use client';
import { useState, useEffect } from 'react'
import { useAppSelector } from '@/store';
import BrandsSlider from './BrandsSlider'
import DashboardSlider from './DashboardSlider';
import { getBestsellersOrNewTools } from '@/http/api/tools';
import { ITool } from '@/types/tool';
import styles from '@/styles/dashboard/index.module.scss'

const DashboardPage = () => {
	const theme = useAppSelector(state => state.theme.theme)
	const darkModeClass = theme === 'dark' ? `${styles.dark_mode}` : '';
	const [bestsellers, setBestsellers] = useState<ITool[]>([])
	const [newParts, setNewParts] = useState<ITool[]>([])
	const [spinner, setSpinner] = useState<boolean>(false)

	useEffect(() => {
		loadTools()
	}, [])

	const loadTools = async () => {
		try {
			setSpinner(true)
			const bestsellers = await getBestsellersOrNewTools('/api/tool/bestsellers')
			const newParts = await getBestsellersOrNewTools('/api/tool/new')
			setBestsellers(bestsellers)
			setNewParts(newParts)
		} catch (error) {
			console.log(error)
		} finally {
			setSpinner(false)
		}
	}

	return (
		<section className={styles.dashboard}>
			<div className={`container ${styles.dashboard__container}`}>
				<div className={styles.dashboard__brands}>
					<BrandsSlider />
				</div>
				<h2 className={`${styles.dashboard__title} ${darkModeClass}`}>Tools</h2>
				<div className={styles.dashboard__parts}>
					<h3 className={`${styles.dashboard__parts__title} ${darkModeClass}`}>Bestsellers</h3>
					<DashboardSlider items={bestsellers} spinner={spinner} goToPartPage={true} />
				</div>
				<div className={styles.dashboard__parts}>
					<h3 className={`${styles.dashboard__parts__title} ${darkModeClass}`}>New</h3>
					<DashboardSlider items={newParts} spinner={spinner} />
				</div>
				<div className={styles.dashboard__about}>
					<h3 className={`${styles.dashboard__parts__title} ${styles.dashboard__about__title} ${darkModeClass}`}>
						About us
					</h3>
					<p className={`${styles.dashboard__about__text} ${darkModeClass}`}>
						Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sapiente minima doloribus reprehenderit
						nostrum cupiditate, laboriosam impedit consequuntur amet libero cumque maxime necessitatibus maiores
						porro sed doloremque cum, quis fugiat inventore. Lorem ipsum dolor sit amet consectetur adipisicing
						elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
						voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.
					</p>
				</div>
			</div>
		</section>
	)
}

export default DashboardPage