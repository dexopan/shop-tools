import { $host } from '@/http/axiosClient'
import { showAuthError } from '@/utils/errors';



export const getBestsellersOrNewTools = async (url: string) => {
	try {
		const { data } = await $host.get(url)
		return data
	} catch (error: any) {
		showAuthError(error.response)
	}
}