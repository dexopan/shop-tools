import { IAuthProps } from '@/types/auth';
import styles from '@/styles/auth/index.module.scss';


const PasswordInput = ({ register, error }: IAuthProps) => {
	return (
		<label className={styles.form__label} htmlFor="">
			<input {...register('password', {
				required: 'Password is required',
				minLength: 4,
				maxLength: 20,
			})} className={styles.form__input} type="password" placeholder="Password" />
			{error.password && (
				<span className={styles.error__alert}>{error.password?.message}</span>
			)}
			{error.password && error.password.type === 'minLength' && (
				<span className={styles.error__alert}>Password is too short</span>
			)}
			{error.password && error.password.type === 'maxLength' && (
				<span className={styles.error__alert}>Password is too long</span>
			)}
		</label>
	)
}

export default PasswordInput