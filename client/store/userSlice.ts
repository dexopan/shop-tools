import { createSlice } from '@reduxjs/toolkit';


interface IUser {
	id: string
	email: string
	username: string
}

type InitialState = {
	user: IUser
};

const initialState: InitialState = {
	user: {
		id: '',
		username: '',
		email: ''
	}
};


const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser(state, action) {
			state.user = action.payload
		},
	}
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;