import NameInput from '@/components/elements/authPage/NameInput';
import EmailInput from '@/components/elements/authPage/EmailInput';
import PasswordInput from '@/components/elements/authPage/PasswordInput';
import { useForm } from 'react-hook-form';
import { IInputs } from '@/types/auth';
import styles from '@/styles/auth/index.module.scss';

const SignUpPage = ({ switchform }: { switchform: () => void }) => {

	const { register, handleSubmit, formState: { errors }, resetField } = useForm<IInputs>();

	const onSubmit = (data: IInputs) => {
		resetField('name');
		resetField('email');
		resetField('password');
		switchform();

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
