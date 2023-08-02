import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import NameInput from '@/components/elements/authPage/NameInput';
import PasswordInput from '@/components/elements/authPage/PasswordInput';
import { signIn } from '@/http/api/auth';
import { showAuthError } from '@/utils/errors';
import { useAppSelector } from '@/store';
import { IInputs } from '@/types/auth';
import styles from '@/styles/auth/index.module.scss';
import spinnerStyle from '@/styles/spinner/index.module.scss';

const SignInPage = () => {

	const [spinner, setSpinner] = useState(false);


	const { register, handleSubmit, formState: { errors }, resetField } = useForm<IInputs>();

	const theme = useAppSelector(state => state.theme.theme)
	const darkModeClass = theme === 'dark' ? `${styles.dark_mode}` : '';
	const route = useRouter();
	const onSubmit = async (data: IInputs) => {
		try {
			setSpinner(true);
			const userData = await signIn({
				url: '/api/user/login',
				username: data.username,
				password: data.password
			});
			if (userData) {
				resetField('username');
				resetField('password');
				route.push('/main');

			}
		} catch (error: any) {
			showAuthError(error)
		} finally {
			setSpinner(false);
		}
	}
	return (
		<form className={`${styles.form} ${darkModeClass}`} onSubmit={handleSubmit(onSubmit)} >
			<h2 className={`${styles.title} ${styles.form__title} ${darkModeClass}`}>Sign in to Website</h2>
			<NameInput register={register} error={errors} />
			<PasswordInput register={register} error={errors} />
			<button className={`${styles.button} ${styles.form__button} ${styles.submit} ${darkModeClass}`}>
				{spinner ? <div className={spinnerStyle.spinner} /> : 'SIGN IN'}
			</button>
		</form>
	)
}

export default SignInPage
