import { IFeedbackInputs } from '@/types/feedbackForm'
import styles from '@/styles/feedbackForm/index.module.scss'

const PhoneInput = ({ register, errors, darkModeClass }: IFeedbackInputs) => (
	<label className={`${styles.feedback_form__form__label} ${darkModeClass}`}>
		<span>Phone number *</span>
		<input
			className={styles.feedback_form__form__input}
			placeholder="+7 999 999 99 99"
			type="tel"
			{...register('phone', {
				required: 'Enter your phone number',
				pattern: {
					value: /^\d*[1-9]\d*$/,
					message: 'Invalid value',
				},
				minLength: 11,
				maxLength: 11,
			})}
		/>
		{errors.phone && (
			<span className={styles.error_alert}>{errors.phone?.message}</span>
		)}
		{errors.phone && errors.phone.type === 'minLength' && (
			<span className={styles.error_alert}>At least 11 digits</span>
		)}
		{errors.phone && errors.phone.type === 'maxLength' && (
			<span className={styles.error_alert}>No more than 11 digits</span>
		)}
	</label>
)

export default PhoneInput