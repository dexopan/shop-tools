import { FieldErrors, UseFormRegister } from "react-hook-form";

export interface IInputs {
	email: string;
	password: string;
	name: string;
}

export interface IAuthProps {
	register: UseFormRegister<IInputs>
	error: FieldErrors<IInputs>
}