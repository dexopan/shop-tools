import { FieldErrorsImpl, UseFormRegister } from 'react-hook-form'

export type FeedbackInputs = {
	name: string;
	phone: string;
	email: string;
	message: string;
}

export interface IFeedbackInputs {
	register: UseFormRegister<FeedbackInputs>;
	errors: Partial<FieldErrorsImpl<FeedbackInputs>>;
	darkModeClass?: string;
}