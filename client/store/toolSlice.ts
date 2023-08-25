import { createSlice } from '@reduxjs/toolkit';
import { manufacturers, typesTools } from '@/utils/catalog';
import { IFilterCheckboxItem } from '@/types/catalog';
import { ITool } from '@/types/tool';





type InitialState = {
	allTools: ITool[]
	limitTools: ITool[]
	manufacturers: IFilterCheckboxItem[]
	typesTools: IFilterCheckboxItem[]
};

const initialState: InitialState = {
	allTools: [] as ITool[],
	limitTools: [] as ITool[],
	manufacturers: manufacturers as IFilterCheckboxItem[],
	typesTools: typesTools as IFilterCheckboxItem[]
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
		}
	}
});



export const { setAllTools, setToolWithLimit, setManufacturers, setTypesTools, updateManufacturers, updateTypesTools } = toolSlice.actions;

export default toolSlice.reducer;