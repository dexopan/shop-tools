'use client'
import { MutableRefObject, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useAppSelector } from '@/store';
import { FeedbackInputs } from '@/types/feedbackForm';
import NameInput from './NameInput';
import PhoneInput from './PhoneInput';
import EmailInput from './EmailInput';
import MessageInput from './MessageInput';
import styles from "@/styles/feedbackForm/index.module.scss"


const FeedbackForm = () => {
	const theme = useAppSelector(state => state.theme.theme)
	const darkModeClass = theme === 'dark' ? `${styles.dark_mode}` : '';
	const { register, handleSubmit, formState: { errors } } = useForm<FeedbackInputs>()
	const formRef = useRef() as MutableRefObject<HTMLFormElement>
	const submitForm = (data: FeedbackInputs) => {
		try {
			formRef.current.reset()
			toast.success(`The message has been sent`)
		} catch (error) {
			toast.error('Something went wrong')
		}
	}
	return (
		<div className={`${styles.feedback_form} ${darkModeClass}`}>
			<h3 className={`${styles.feedback_form__title} ${darkModeClass}`}>
				Feedback form
			</h3>
			<form ref={formRef} className={styles.feedback_form__form} onSubmit={handleSubmit((submitForm))}>
				<NameInput register={register} errors={errors} darkModeClass={darkModeClass} />
				<PhoneInput register={register} errors={errors} darkModeClass={darkModeClass} />
				<EmailInput register={register} errors={errors} darkModeClass={darkModeClass} />
				<MessageInput register={register} errors={errors} darkModeClass={darkModeClass} />
				<div className={styles.feedback_form__form__btn}>
					<button>Send a message</button>
				</div>
			</form>
		</div>
	)
}

export default FeedbackForm