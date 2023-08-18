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
	}
});

export const { setTools } = toolSlice.actions;

export default toolSlice.reducer;