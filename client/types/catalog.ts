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
	title: string | false;
	setManufacturers: ActionCreatorWithPayload<any, "tools/setManufacturers"> | ActionCreatorWithPayload<any, "tools/setTypesTools">;
	updateManufacturers: ActionCreatorWithPayload<any, "tools/updateManufacturers"> | ActionCreatorWithPayload<any, "tools/updateTypesTools">;
}

export interface ICatalogBaseProps {
	priceRange: number[];
	setPriceRange: (arg0: number[]) => void;
	setIsPriceRangeChanged: (arg0: boolean) => void;
}
export interface ICatalogFilterProps extends ICatalogBaseProps {
	resetFilterBtnDisabled: boolean;
	resetFilters: () => void;
	isPriceRangeChanged: boolean;
	setCurrentPage: (arg0: number) => void;
	closePopup: () => void;
	filtersMobileOpen: boolean;
}

export interface IPriceRangeProps extends ICatalogBaseProps {
}

export interface ICatalogFilterDesktopProps extends ICatalogBaseProps {
	resetFilterBtnDisabled: boolean;
	spinner: boolean;
	resetFilters: () => void;
	applyFilters: () => void;
}

export interface IFilterSelectProps {
	priceRange: number[];
	setSpinner: (arg0: boolean) => void;
	setCurrentPage: (arg0: number) => void;
}

export interface ICatalogFilterMobileProps extends ICatalogBaseProps {
	resetFilterBtnDisabled: boolean;
	spinner: boolean;
	resetFilters: () => void;
	applyFilters: () => void;
	closePopup: () => void;
	filtersMobileOpen: boolean;
}

export interface IFiltersPopupTop {
	resetBtnText: string;
	title: string;
	resetFilters: () => void;
	resetFilterBtnDisabled: boolean;
	closePopup: () => void;
}

export interface IFiltersPopupProps extends IFilterManufacturerAccordionProps {
	resetFilterBtnDisabled: boolean;
	resetAllManufacturers: () => void;
	handleClosePopup: () => void;
	applyFilters: () => void;
	openPopup: boolean;
}