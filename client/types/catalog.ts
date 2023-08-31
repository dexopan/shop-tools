import { ActionCreatorWithPayload } from "@reduxjs/toolkit";

export interface IManufacturersBlockProps {
	title: string;
}

export interface IQueryParams {
	offset: string;
	sort: string;
	manufacturer: string;
	type: string;
	priceFrom: number;
	priceTo: number;
}

export interface IFilterCheckboxItem {
	name: string;
	checked: boolean;
	id: string;
	event: ActionCreatorWithPayload<any, "tools/updateManufacturers"> | ActionCreatorWithPayload<any, "tools/updateTypesTools">;
}

export interface IFilterManufacturerAccordionProps {
	manufacturersList: IFilterCheckboxItem[];
	title: string | undefined;
	setManufacturers: ActionCreatorWithPayload<any, "tools/setManufacturers"> | ActionCreatorWithPayload<any, "tools/setTypesTools">;
	updateManufacturers: ActionCreatorWithPayload<any, "tools/updateManufacturers"> | ActionCreatorWithPayload<any, "tools/updateTypesTools">;
}

export interface ICatalogFilterProps {
	priceRange: number[];
	setPriceRange: (arg0: number[]) => void;
	setIsPriceRangeChanged: (arg0: boolean) => void;
	resetFilterBtnDisabled: boolean;
}

export interface IPriceRangeProps {
	priceRange: number[];
	setPriceRange: (arg0: number[]) => void;
	setIsPriceRangeChanged: (arg0: boolean) => void;
}

export interface ICatalogFilterDesktopProps {
	priceRange: number[];
	setPriceRange: (arg0: number[]) => void;
	setIsPriceRangeChanged: (arg0: boolean) => void;
	resetFilterBtnDisabled: boolean;
	spinner: boolean;
}