import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAppSelector } from '@/store';
import styles from "@/styles/tool/index.module.scss"

const ToolTabs = () => {
	const theme = useAppSelector(state => state.theme.theme)
	const darkModeClass = theme === 'dark' ? `${styles.dark_mode}` : '';
	const tool = useAppSelector(state => state.tools.oneTool)
	const [showDescription, setShowDescription] = useState(true)
	const [showCharacteristics, setShowCharacteristics] = useState(false)

	const toggleDescription = () => {
		setShowDescription(true)
		setShowCharacteristics(false)
	}

	const toggleCharacteristics = () => {
		setShowDescription(false)
		setShowCharacteristics(true)
	}

	return (
		<div className={styles.tool__tabs}>
			<div className={`${styles.tool__tabs__controls} ${darkModeClass}`}>
				<button
					className={showDescription ? styles.active : ''}
					onClick={toggleDescription}
				>
					Description
				</button>
				<button
					className={showCharacteristics ? styles.active : ''}
					onClick={toggleCharacteristics}
				>
					Characteristics
				</button>
			</div>
			{showDescription && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className={styles.tool__tabs__content}
				>
					<h3 className={`${styles.tool__tabs__content__title} ${darkModeClass}`}					>
						{tool.name}
					</h3>
					<p className={`${styles.tool__tabs__content__text} ${darkModeClass}`}>
						{tool.description}
					</p>
				</motion.div>
			)}
			{showCharacteristics && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className={styles.tool__tabs__content}
				>
					<p className={`${styles.tool__tabs__content__text} ${darkModeClass}`}>
						{tool.vendorCode}
					</p>
				</motion.div>
			)}
		</div>
	)
}

export default ToolTabs