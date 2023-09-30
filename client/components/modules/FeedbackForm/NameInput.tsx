
import { useAppSelector } from '@/store'
import { IFeedbackInputs } from '@/types/feedbackForm'
import styles from '@/styles/feedbackForm/index.module.scss'

const NameInput = ({ register, errors, darkModeClass }: IFeedbackInputs) => {
	const user = useAppSelector(state => state.user.user)
	return (
		<label className={`${styles.feedback_form__form__label} ${darkModeClass}`}>
			<span>Name *</span>
			<input
				className={styles.feedback_form__form__input}
				type="text"
				placeholder={user.username}
				{...register('name', {
					required: 'Name is required',
					pattern: {
						value: /^[а-яА-Яa-zA-ZёЁ]*$/,
						message: 'Name is invalid',
					},
					minLength: 2,
					maxLength: 15,
				})}
			/>
			{errors.name && (
				<span className={styles.error_alert}>{errors.name?.message}</span>
			)}
			{errors.name && errors.name.type === 'minLength' && (
				<span className={styles.error_alert}>Name is too short</span>
			)}
			{errors.name && errors.name.type === 'maxLength' && (
				<span className={styles.error_alert}>Name is too long</span>
			)}
		</label>)
}

export default NameInput