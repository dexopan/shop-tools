import { createSlice } from '@reduxjs/toolkit';
import { IShoppingCart } from '@/types/tool';


type InitialState = {
	cart: IShoppingCart
};

const initialState: InitialState = {
	cart: {
		tools: [],
		quantity: 0,
		totalPrice: 0,
		username: '',
		id: ''
	}
};


const cartSlice = createSlice({
	name: 'shoppingCart',
	initialState,
	reducers: {
		setCart(state, action) {
			state.cart = action.payload
		}
	}
});

export const { setCart } = cartSlice.actions;

export default cartSlice.reducer;