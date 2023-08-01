'use client';
import Header from '@/components/modules/Header/Header';
import { useAppSelector } from '@/store';
import './globals.css'


export default function Main() {
	const theme = useAppSelector(state => state.theme.theme)
	// const darkModeClass = theme === 'dark' ? `${styles.dark_mode}` : '';
	return (
		<>
			<Header />
			<main>
				<h1 style={{ height: '1000px' }}>Main</h1>
				<div className='overlay'></div>
			</main>
		</>
	)
}
