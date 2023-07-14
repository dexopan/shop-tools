'use client';
import { useRef } from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import styles from '@/styles/auth/index.module.scss';
import SignUpPage from '@/components/modules/authPage/SignUpPage';


export default function Auth() {
	const isMedia800 = useMediaQuery(800);
	const switchCtn = useRef() as React.MutableRefObject<HTMLDivElement>;
	const switchC1 = useRef() as React.MutableRefObject<HTMLDivElement>;
	const switchC2 = useRef() as React.MutableRefObject<HTMLDivElement>;
	const switchCircle1 = useRef() as React.MutableRefObject<HTMLDivElement>;
	const switchCircle2 = useRef() as React.MutableRefObject<HTMLDivElement>;
	const aContainer = useRef() as React.MutableRefObject<HTMLDivElement>;
	const bContainer = useRef() as React.MutableRefObject<HTMLDivElement>;

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
		<div className={styles.main}>

			<div ref={aContainer} className={`${styles.container} ${styles.a_container}`} id="a_container">
				<div className={styles.container_inner}>
					<SignUpPage switchform={switchForm} />
				</div>
			</div>

			<div ref={bContainer} className={`${styles.container} ${styles.b_container}`} id="b_container">
				<div className={styles.container_inner}>
					<form className={styles.form} >
						<h2 className={`${styles.title} ${styles.form__title}`}>Sign in to Website</h2>
						<input className={styles.form__input} type="text" placeholder="Email" />
						<input className={styles.form__input} type="password" placeholder="Password" />
						<button className={`${styles.button} ${styles.form__button} ${styles.submit}`}>SIGN IN</button>
					</form>
				</div>
			</div>

			<div ref={switchCtn} className={styles.switch} id="switch-cnt">
				<div ref={switchCircle1} className={styles.switch__circle}></div>
				<div ref={switchCircle2} className={`${styles.switch__circle} ${styles.switch__circle__t}`}></div>

				<div ref={switchC1} className={styles.switch__container} id="switch-c1">
					{!isMedia800 && (
						<>
							<h2 className={`${styles.switch__title} ${styles.title}`}>Welcome Back !</h2>
							<p className={`${styles.switch__description} ${styles.description}`}>To keep connected with us please login with your personal info</p>
						</>
					)}
					<button onClick={switchForm} className={`${styles.button} ${styles.switch__button} ${styles.switch_btn}`}>SIGN IN</button>
				</div>

				<div ref={switchC2} className={`${styles.switch__container} ${styles.is_hidden}`} id="switch-c2">
					{!isMedia800 && (
						<>
							<h2 className={`${styles.switch__title} ${styles.title}`}>Hello Friend !</h2>
							<p className={`${styles.switch__description} ${styles.description}`}>Enter your personal details and start journey with us</p>
						</>
					)}
					<button onClick={switchForm} className={`${styles.button} ${styles.switch__button} ${styles.switch_btn}`}>SIGN UP</button>
				</div>

			</div>
		</div>
	)
}
