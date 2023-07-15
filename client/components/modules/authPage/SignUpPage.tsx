import NameInput from '@/components/elements/authPage/NameInput';
import EmailInput from '@/components/elements/authPage/EmailInput';
import PasswordInput from '@/components/elements/authPage/PasswordInput';
import { useForm } from 'react-hook-form';
import { IInputs } from '@/types/auth';
import styles from '@/styles/auth/index.module.scss';
import { signUp } from '@/http/api/auth';
import { toast } from 'react-toastify';

const SignUpPage = ({ switchform }: { switchform: () => void }) => {

	const { register, handleSubmit, formState: { errors }, resetField } = useForm<IInputs>();

	const onSubmit = async (data: IInputs) => {
		try {
			const userData = await signUp({
				url: '/api/user/register',
				username: data.username,
				email: data.email,
				password: data.password
			});

			console.log(userData)

			resetField('username');
			resetField('email');
			resetField('password');
			switchform();
		} catch (error) {
			toast.error((error as Error).message);
		}
	}
	return (
		<form className={styles.form} onSubmit={handleSubmit(onSubmit)} >
			<h2 className={`${styles.title} ${styles.form__title}`}>Create Account</h2>
			<NameInput register={register} error={errors} />
			<EmailInput register={register} error={errors} />
			<PasswordInput register={register} error={errors} />
			<button className={`${styles.button} ${styles.form__button} ${styles.submit}`}>SIGN UP</button>
		</form>
	)
}

export default SignUpPage
