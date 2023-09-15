import { createSlice } from '@reduxjs/toolkit';

type InitialState = {
	theme: string;
};

if (!localStorage.getItem('theme')) {
	localStorage.setItem('theme', 'light');
}

const initialState: InitialState = {
	theme: localStorage.getItem('theme') || 'light'
};


const themeSlice = createSlice({
	name: 'theme',
	initialState,
	reducers: {
		toggleTheme: (state) => {
			state.theme = state.theme === 'light' ? 'dark' : 'light';
			localStorage.setItem('theme', state.theme);
		}
	}
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;