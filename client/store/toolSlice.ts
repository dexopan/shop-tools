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
	}
});



export const { setAllTools, setToolWithLimit } = toolSlice.actions;

export default toolSlice.reducer;