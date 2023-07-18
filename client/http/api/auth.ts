import { toast } from "react-toastify";
import { $host } from '@/http/axiosClient'
import { showAuthError } from '@/utils/errors';
import { ISingIn, ISingUp } from "@/types/auth";


export const signUp = async ({ url, username, password, email }: ISingUp) => {
	try {
		const { data } = await $host.post(url, { username, password, email })
		toast.success('Registration completed successfully')
		return data
	} catch (error: any) {
		showAuthError(error.response)

	}
}

export const signIn = async ({ url, username, password }: ISingIn) => {
	try {
		const { data } = await $host.post(url, { username, password })
		toast.success('Logged in successfully')
		localStorage.setItem('token', data.result.token);
		localStorage.setItem('username', data.result.username);
		return data
	} catch (error: any) {
		showAuthError(error.response)

	}
}

