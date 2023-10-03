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

export const getOneTool = async (url: string) => {
	try {
		const { data } = await $authHost.get(url)
		return data
	} catch (error: any) {
		showAuthError(error.response)
	}
}

export const getToolsBySearch = async ({ url, search }: { url: string, search: string }) => {
	try {
		const { data } = await $authHost.post(url, { search })
		return data
	} catch (error: any) {
		showAuthError(error.response)
	}
}

export const getToolsByName = async ({ url, name }: { url: string, name: string }) => {
	try {
		const { data } = await $authHost.post(url, { name })
		return data
	} catch (error: any) {
		showAuthError(error.response)
	}
}