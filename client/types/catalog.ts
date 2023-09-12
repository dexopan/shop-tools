import { ActionCreatorWithPayload } from "@reduxjs/toolkit";

export interface IManufacturersBlockProps {
	title: string;
	event: ActionCreatorWithPayload<any, "tools/updateManufacturers"> | ActionCreatorWithPayload<any, "tools/updateTypesTools">;
	manufacturersList: IFilterCheckboxItem[];
}

export interface IManufacturersBlockItemProps {
	item: IFilterCheckboxItem;
	event: ActionCreatorWithPayload<any, "tools/updateManufacturers"> | ActionCreatorWithPayload<any, "tools/updateTypesTools">;
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
	resetFilters: () => void;
	isPriceRangeChanged: boolean;
	setCurrentPage: (arg0: number) => void;
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
	resetFilters: () => void;
	applyFilters: () => void;
}


export interface IFilterSelectProps {
	priceRange: number[];
}