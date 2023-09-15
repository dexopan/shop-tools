import { $authHost } from '@/http/axiosClient'
import { showAuthError } from '@/utils/errors';
import { IAddToCart, IRemoveFromCart } from '@/types/tool';


export const getCartItems = async (url: string) => {
	try {
		const { data } = await $authHost.get(url)
		return data
	} catch (error: any) {
		showAuthError(error.response)
	}
}

export const addItemToCart = async ({ url, userId, toolId }: IAddToCart) => {
	try {
		const { data } = await $authHost.post(url, { userId, toolId })
		return data
	} catch (error: any) {
		showAuthError(error.response)
	}
}

export const removeItemFromCart = async ({ url, userId, toolId }: IRemoveFromCart) => {
	try {
		const { data } = await $authHost.delete(url, { data: { userId, toolId } })
		return data
	} catch (error: any) {
		showAuthError(error.response)
	}
}