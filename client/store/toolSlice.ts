import { ITool } from '@/types/tool';
import { createSlice } from '@reduxjs/toolkit';




type InitialState = {
	allTools: ITool[]
	limitTools: ITool[]
};

const initialState: InitialState = {
	allTools: [] as ITool[],
	limitTools: [] as ITool[]
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
		setToolsChepearFirst(state) {
			state.limitTools.sort((a, b) => a.priceOne - b.priceOne);
		},
		setToolsExpensiveFirst(state) {
			state.limitTools.sort((a, b) => b.priceOne - a.priceOne);
		},
		setToolsByPopularity(state) {
			state.limitTools.sort((a, b) => b.popularity - a.popularity);
		}
	}
});



export const { setAllTools, setToolWithLimit, setToolsChepearFirst, setToolsExpensiveFirst, setToolsByPopularity } = toolSlice.actions;

export default toolSlice.reducer;