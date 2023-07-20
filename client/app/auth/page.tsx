'use client';
import { useRef } from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import SignUpPage from '@/components/modules/authPage/SignUpPage';
import SignInPage from '@/components/modules/authPage/SignInPage';
import TogglerTheme from '@/components/elements/togglerTheme/togglerTheme';
import { useAppSelector } from '@/store';
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import styles from '@/styles/auth/index.module.scss';


export default function Auth() {
	const isMedia800 = useMediaQuery(800);
	const switchCtn = useRef() as React.MutableRefObject<HTMLDivElement>;
	const switchC1 = useRef() as React.MutableRefObject<HTMLDivElement>;
	const switchC2 = useRef() as React.MutableRefObject<HTMLDivElement>;
	const switchCircle1 = useRef() as React.MutableRefObject<HTMLDivElement>;
	const switchCircle2 = useRef() as React.MutableRefObject<HTMLDivElement>;
	const aContainer = useRef() as React.MutableRefObject<HTMLDivElement>;
	const bContainer = useRef() as React.MutableRefObject<HTMLDivElement>;

	const theme = useAppSelector(state => state.theme.theme)
	const darkModeClass = theme === 'dark' ? `${styles.dark_mode}` : '';

	function switchForm() {
		switchCtn.current.classList.add(styles.is_gx);
		setTimeout(() => switchCtn.current.classList.remove(styles.is_gx), 1500)
		switchCtn.current.classList.toggle(styles.is_txr);
		switchCircle1.current.classList.toggle(styles.is_txr);
		switchCircle2.current.classList.toggle(styles.is_txr);
		switchC1.current.classList.toggle(styles.is_hidden);
		switchC2.current.classList.toggle(styles.is_hidden);
		aContainer.current.classList.toggle(styles.is_txl);
		bContainer.current.classList.toggle(styles.is_txl);
		bContainer.current.classList.toggle(styles.is_z200);
	}

	return (
		<div className={`${styles.main} ${darkModeClass}`}>
			<TogglerTheme />

			<div ref={aContainer} className={`${styles.container} ${styles.a_container} ${darkModeClass}`} id="a_container">
				<div className={styles.container_inner}>
					<SignUpPage switchform={switchForm} />
				</div>
			</div>

			<div ref={bContainer} className={`${styles.container} ${styles.b_container} ${darkModeClass}`} id="b_container">
				<div className={styles.container_inner}>
					<SignInPage />
				</div>
			</div>

			<div ref={switchCtn} className={`${styles.switch} ${darkModeClass}`} id="switch-cnt">
				<div ref={switchCircle1} className={`${styles.switch__circle} ${darkModeClass}`}></div>
				<div ref={switchCircle2} className={`${styles.switch__circle} ${styles.switch__circle__t} ${darkModeClass}`}></div>

				<div ref={switchC1} className={styles.switch__container} id="switch-c1">
					{!isMedia800 && (
						<>
							<h2 className={`${styles.switch__title} ${styles.title} ${darkModeClass}`}>Welcome Back !</h2>
							<p className={`${styles.switch__description} ${styles.description} ${darkModeClass}`}>To keep connected with us please login with your personal info</p>
						</>
					)}
					<button onClick={switchForm} className={`${styles.button} ${styles.switch__button} ${styles.switch_btn} ${darkModeClass}`}>SIGN IN</button>
				</div>

				<div ref={switchC2} className={`${styles.switch__container} ${styles.is_hidden}`} id="switch-c2">
					{!isMedia800 && (
						<>
							<h2 className={`${styles.switch__title} ${styles.title} ${darkModeClass}`}>Hello Friend !</h2>
							<p className={`${styles.switch__description} ${styles.description} ${darkModeClass}`}>Enter your personal details and start journey with us</p>
						</>
					)}
					<button onClick={switchForm} className={`${styles.button} ${styles.switch__button} ${styles.switch_btn} ${darkModeClass}`}>SIGN UP</button>
				</div>

			</div>
			<ToastContainer
				position="bottom-right"
				hideProgressBar={false}
				closeOnClick
				rtl={false}
				limit={1}
				theme="light"
			/>
		</div>
	)
}
