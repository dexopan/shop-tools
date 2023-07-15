import { IAuthProps } from '@/types/auth';
import styles from '@/styles/auth/index.module.scss';


const NameInput = ({ register, error }: IAuthProps) => {
	return (
		<label className={styles.form__label} htmlFor="">
			<input {...register('username', {
				required: 'Name is required',
				minLength: 3,
				maxLength: 20,
				pattern: {
					value: /^[A-Za-z0-9]+$/,
					message: 'Name is invalid'
				}
			})} className={styles.form__input} type="text" placeholder="Name" />
			{error.username && (
				<span className={styles.error__alert}>{error.username?.message}</span>
			)}
			{error.username && error.username.type === 'minLength' && (
				<span className={styles.error__alert}>Name is too short</span>
			)}
			{error.username && error.username.type === 'maxLength' && (
				<span className={styles.error__alert}>Name is too long</span>
			)}
		</label>
	)
}

export default NameInput