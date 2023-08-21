import { ITool } from '@/types/tool';
import { createSlice } from '@reduxjs/toolkit';




type InitialState = {
	tools: ITool[]
};

const initialState: InitialState = {
	tools: [] as ITool[]
};


const toolSlice = createSlice({
	name: 'tools',
	initialState,
	reducers: {
		setTools(state, action) {
			state.tools = action.payload;
		},
		setToolsChepearFirst(state) {
			state.tools.sort((a, b) => a.priceOne - b.priceOne);
		},
		setToolsExpensiveFirst(state) {
			state.tools.sort((a, b) => b.priceOne - a.priceOne);
		},
		setToolsByPopularity(state) {
			state.tools.sort((a, b) => b.popularity - a.popularity);
		}
	}
});



export const { setTools, setToolsChepearFirst, setToolsExpensiveFirst, setToolsByPopularity } = toolSlice.actions;

export default toolSlice.reducer;