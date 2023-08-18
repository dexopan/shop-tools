import { $authHost, $host } from '@/http/axiosClient'
import { showAuthError } from '@/utils/errors';



export const getBestsellersOrNewTools = async (url: string) => {
	try {
		const { data } = await $authHost.get(url)
		return data
	} catch (error: any) {
		showAuthError(error.response)
	}
}

export const getTools = async (url: string) => {
	try {
		const { data } = await $authHost.get(url)
		return data
	} catch (error: any) {
		showAuthError(error.response)
	}
}