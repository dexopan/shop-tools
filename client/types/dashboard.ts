import { ITool } from "@/types/tool";

export interface IDashboardSlider {
	items: ITool[]
	spinner: boolean
	goToPartPage?: boolean
}

export interface ICartAlertProps {
	count: number
	closeAlert: VoidFunction
}