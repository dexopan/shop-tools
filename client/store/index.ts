'use client';
import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./themeSlice";
import cartReducer from "./cartSlice";
import userReducer from "./userSlice";
import toolReducer from "./toolSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
	reducer: {
		theme: themeReducer,
		cart: cartReducer,
		user: userReducer,
		tools: toolReducer,
	},
});

type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;