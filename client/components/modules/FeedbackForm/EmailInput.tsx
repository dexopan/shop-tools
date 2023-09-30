import { useAppSelector } from '@/store'
import { IFeedbackInputs } from '@/types/feedbackForm'
import styles from '@/styles/feedbackForm/index.module.scss'

const EmailInput = ({ register, errors, darkModeClass }: IFeedbackInputs) => {
	const user = useAppSelector(state => state.user.user)
	return (
		<label className={`${styles.feedback_form__form__label} ${darkModeClass}`}>
			<span>Email *</span>
			<input
				className={styles.feedback_form__form__input}
				type="email"
				placeholder={user.email}
				{...register('email', {
					required: 'Email is required',
					pattern: {
						value: /\S+@\S+\.\S+/,
						message: 'Email is invalid',
					},
				})}
			/>
			{errors.email && (
				<span className={styles.error_alert}>{errors.email?.message}</span>
			)}
		</label>
	)
}

export default EmailInput