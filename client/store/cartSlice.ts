import { createSlice } from '@reduxjs/toolkit';

interface ITool {
	id: string
	manufacturer: string
	priceOne: number
	vendorCode: string
	name: string
	type: string
	description: string
	images: string[]
	inStock: number
	bestseller: boolean
	new: boolean
	popularity: number
}

interface IBasket {
	id: string
	userId: string
	quantity: number
	totalPrice: number
}

interface IShoppingCartItem {
	id: string
	tool: ITool
	toolId: string
	basket: IBasket
	basketId: string
	count: number
	price: number
}

type InitialState = {
	cart: IShoppingCartItem[]
};

const initialState: InitialState = {
	cart: []
};


const cartSlice = createSlice({
	name: 'shoppingCart',
	initialState,
	reducers: {
		addToCart: (state, action) => {
			const { id, tool, toolId, basket, basketId, count, price } = action.payload;
			const item = state.cart.find((item) => item.id === id);
			if (!item) {
				state.cart.push({ id, tool, toolId, basket, basketId, count, price });
			}
		},
		removeFromCart: (state, action) => {
			const { id } = action.payload;
			const index = state.cart.findIndex((item) => item.id === id);
			if (index !== -1) {
				state.cart.splice(index, 1);
			}
		},
		incrementQuantity: (state, action) => {
			const { id } = action.payload;
			const item = state.cart.find((item) => item.id === id);
			if (item) {
				item.count++;
				item.price = item.tool.priceOne * item.count;
			}
		},
		decrementQuantity: (state, action) => {
			const { id } = action.payload;
			const item = state.cart.find((item) => item.id === id);
			if (item) {
				item.count--;
				item.price = item.tool.priceOne * item.count;
			}
		},
		clearCart: (state) => {
			state.cart = [];
		}

	}
});

export const { addToCart, clearCart, decrementQuantity, incrementQuantity, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;