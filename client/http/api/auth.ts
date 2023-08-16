import { toast } from "react-toastify";
import { $authHost, $host } from '@/http/axiosClient'
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
		localStorage.setItem('email', data.result.email);
		return data
	} catch (error: any) {
		showAuthError(error.response)

	}
}

export const checkAuth = async () => {
	try {
		const { data } = await $authHost.get('api/user/checkAuth')
		return data
	} catch (error: any) {
		return
	}
}

export const logout = async () => {
	try {
		const { data } = await $authHost.get('api/user/logout')
		localStorage.removeItem('token');
		localStorage.removeItem('username');
		localStorage.removeItem('email');
		toast.success('Logged out successfully')
		return data
	} catch (error: any) {
		showAuthError(error.response)
	}
}

