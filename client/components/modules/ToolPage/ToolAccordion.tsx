import Accordion from "@/components/elements/accordion/Accordion";
import { useAppSelector } from "@/store";
import { IToolAccordionProps } from "@/types/tool";
import styles from "@/styles/tool/index.module.scss"


const ToolAccordion = ({ children, title }: IToolAccordionProps) => {
	const theme = useAppSelector(state => state.theme.theme)
	const darkModeClass = theme === 'dark' ? `${styles.dark_mode}` : '';

	const handleExpandAccordion = (expanded: boolean) => {
		const accordionTitles = document.querySelectorAll(`.${styles.tool__accordion__title}`)
		accordionTitles.forEach(accordionTitle => {
			const item = accordionTitle as HTMLElement
			if (item.textContent === title) {
				item.style.borderBottomLeftRadius = expanded ? '4px' : '0px'
				item.style.borderBottomRightRadius = expanded ? '4px' : '0px'
			}
		})
	}

	return (
		<Accordion
			title={title}
			titleClass={`${styles.tool__accordion__title} ${darkModeClass}`}
			arrowOpenClass={styles.open}
			boxShadowStyle='0px 2px 8px rgba(0, 0, 0, 0.1)'
			callback={handleExpandAccordion}>
			{children}
		</Accordion>
	)
}

export default ToolAccordion