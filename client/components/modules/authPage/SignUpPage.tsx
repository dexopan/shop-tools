import { useState } from 'react';
import { useForm } from 'react-hook-form';
import NameInput from '@/components/elements/authPage/NameInput';
import EmailInput from '@/components/elements/authPage/EmailInput';
import PasswordInput from '@/components/elements/authPage/PasswordInput';
import { signUp } from '@/http/api/auth';
import { showAuthError } from '@/utils/errors';
import { IInputs } from '@/types/auth';
import { useAppSelector } from '@/store';
import styles from '@/styles/auth/index.module.scss';
import spinnerStyle from '@/styles/spinner/index.module.scss';


const SignUpPage = ({ switchform }: { switchform: () => void }) => {

	const [spinner, setSpinner] = useState(false);

	const { register, handleSubmit, formState: { errors }, resetField } = useForm<IInputs>();

	const theme = useAppSelector(state => state.theme.theme)
	const darkModeClass = theme === 'dark' ? `${styles.dark_mode}` : '';

	const onSubmit = async (data: IInputs) => {
		try {
			setSpinner(true);
			const newUser = await signUp({
				url: '/api/user/register',
				username: data.username,
				email: data.email,
				password: data.password
			});

			if (newUser) {
				resetField('username');
				resetField('email');
				resetField('password');
				switchform();
			}

		} catch (error) {
			showAuthError(error)
		} finally {
			setSpinner(false);
		}
	}
	return (
		<form className={`${styles.form} ${darkModeClass}`} onSubmit={handleSubmit(onSubmit)} >
			<h2 className={`${styles.title} ${styles.form__title} ${darkModeClass}`}>Create Account</h2>
			<NameInput register={register} error={errors} />
			<EmailInput register={register} error={errors} />
			<PasswordInput register={register} error={errors} />
			<button className={`${styles.button} ${styles.form__button} ${styles.submit} ${darkModeClass}`}>
				{spinner ? <div className={spinnerStyle.spinner} /> : 'SIGN UP'}
			</button>
		</form>
	)
}

export default SignUpPage
