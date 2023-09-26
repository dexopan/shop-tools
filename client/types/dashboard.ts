import { ITool } from "@/types/tool";

export interface IDashboardSlider {
	items: ITool[]
	spinner: boolean
	goToToolPage?: boolean
}

export interface ICartAlertProps {
	quantity: number
	closeAlert: VoidFunction
}