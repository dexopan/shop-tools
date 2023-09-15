import { createSlice } from '@reduxjs/toolkit';
import { IShoppingCart, IShoppingCartItem } from '@/types/tool';


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

		},
		updateCart(state, action) {
			state.cart = action.payload
		},
		removeFromCart(state, action) {
			state.cart.tools = state.cart.tools.filter((item) => item.tool.id !== action.payload);
		}
	}
});

export const { setCart, updateCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;