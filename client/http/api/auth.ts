import { ISingUp } from "@/types/auth";
import { toast } from "react-toastify";
import { $host } from '@/http/axiosClient'


export const signUp = async ({ url, username, password, email }: ISingUp) => {
	try {
		const { data } = await $host.post(url, { username, password, email })
		return data
	} catch (error) {
		toast.warning((error as Error).message)
		return
	}
}

