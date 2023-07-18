import { FieldErrors, UseFormRegister } from "react-hook-form";

export interface IInputs {
	email: string;
	password: string;
	username: string;
}

export interface IAuthProps {
	register: UseFormRegister<IInputs>
	error: FieldErrors<IInputs>
}

export interface ISingUp {
	url: string;
	username: string;
	password: string;
	email: string;
}

export interface ISingIn {
	url: string;
	username: string;
	password: string;
}