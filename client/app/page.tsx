'use client';
import Header from '@/components/modules/Header/Header';
import { useAppSelector } from '@/store';
import './globals.css'
import styles from '@/styles/auth/index.module.scss';


export default function Main() {
	const theme = useAppSelector(state => state.theme.theme)
	const darkModeClass = theme === 'dark' ? `${styles.dark_mode}` : '';
	return (
		<>
			<Header />
			{/* <div className={`${styles.main} ${darkModeClass}`}>
				Main
			</div> */}
		</>
	)
}
