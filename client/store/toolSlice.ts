import { createSlice } from '@reduxjs/toolkit';
import { manufacturers, typesTools } from '@/utils/catalog';
import { IFilterCheckboxItem } from '@/types/catalog';
import { ITool } from '@/types/tool';





type InitialState = {
	allTools: ITool[]
	limitTools: ITool[]
	manufacturers: IFilterCheckboxItem[]
	typesTools: IFilterCheckboxItem[]
	checkedManufacturers: string[]
	checkedTypesTools: string[]
	oneTool: ITool
};

const initialState: InitialState = {
	allTools: [] as ITool[],
	limitTools: [] as ITool[],
	manufacturers: manufacturers as IFilterCheckboxItem[],
	typesTools: typesTools as IFilterCheckboxItem[],
	checkedManufacturers: JSON.parse(localStorage.getItem('manufacturers') || '[]') as string[],
	checkedTypesTools: JSON.parse(localStorage.getItem('typesTools') || '[]') as string[],
	oneTool: {} as ITool
};


const toolSlice = createSlice({
	name: 'tools',
	initialState,
	reducers: {
		setAllTools(state, action) {
			state.allTools = action.payload;
		},
		setToolWithLimit(state, action) {
			state.limitTools = action.payload;
		},
		setManufacturers(state, action) {
			state.manufacturers = action.payload;
		},
		setTypesTools(state, action) {
			state.typesTools = action.payload;
		},
		setCheckedManufacturers(state) {
			state.manufacturers.map((item) => {
				if (state.checkedManufacturers.find(name => name === item.name)) {
					item.checked = true;
				}
			});
		},
		setCheckedTypesTools(state) {
			state.typesTools.map((item) => {
				if (state.checkedTypesTools.find(name => name === item.name)) {
					item.checked = true;
				}
			});
		},
		updateManufacturers(state, action) {
			state.manufacturers.map((item) => {
				if (item.id === action.payload.id) {
					item.checked = action.payload.checked;
				}
			});
		},
		updateTypesTools(state, action) {
			state.typesTools.map((item) => {
				if (item.id === action.payload.id) {
					item.checked = action.payload.checked;
				}
			});
		},
		setOneTool(state, action) {
			state.oneTool = action.payload;
		}
	}
});


export const {
	setAllTools, setToolWithLimit,
	setManufacturers, setTypesTools,
	updateManufacturers, updateTypesTools,
	setCheckedManufacturers, setCheckedTypesTools,
	setOneTool
} = toolSlice.actions;

export default toolSlice.reducer;