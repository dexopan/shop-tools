import { MultiValue, SingleValue } from "react-select";

export interface IWrapperComponentProps {
	open: boolean,
	setOpen: (arg0: boolean) => void,
}

export interface ISelectOption {
	value: string | number,
	label: string | number,
}

export type SelectOptionType = MultiValue<ISelectOption> | SingleValue<ISelectOption> | null

export interface IAccordionProps {
	children: React.ReactNode;
	title?: string;
	titleClass: string;
	arrowOpenClass: string;
}