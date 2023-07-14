import { IAuthProps } from '@/types/auth';
import styles from '@/styles/auth/index.module.scss';


const EmailInput = ({ register, error }: IAuthProps) => {
	return (
		<label className={styles.form__label} htmlFor="">
			<input {...register('email', {
				required: 'email is required',
				pattern: {
					value: /\S+@\S+\.\S+/,
					message: 'Email is invalid'
				}
			})} className={styles.form__input} type="email" placeholder="Email" />
			{error.email && (
				<span className={styles.error__alert}>{error.email?.message}</span>
			)}

		</label>
	)
}

export default EmailInput