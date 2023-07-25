import { toast } from "react-toastify";
import { HTTPStatus } from '@/constants/index'


export const showAuthError = (error: any) => {

	if (error) {
		if (error.status === HTTPStatus.UNAUTHORIZED) {
			toast.warning(error.data.message);
			return;
		}
	}
	toast.error(error.data.message)
	return
}