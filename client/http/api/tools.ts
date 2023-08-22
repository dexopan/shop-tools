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

export const getAllTools = async (url: string) => {
	try {
		const { data } = await $authHost.get(url)
		return data
	} catch (error: any) {
		showAuthError(error.response)
	}
}

export const getToolsWithLimit = async (url: string) => {
	try {
		const { data } = await $authHost.get(url)
		return data
	} catch (error: any) {
		showAuthError(error.response)
	}
}