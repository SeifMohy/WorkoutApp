import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "store/rootReducer";
import { User } from '@prisma/client';

interface AuthState {
    Loading: boolean,
    fullUser?:User | null,
}

const initialState: AuthState = {
    Loading: false,
    fullUser: null
        
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		authFullUser: (state:AuthState, {payload}: PayloadAction<boolean>) => {
			state.Loading = payload;
		},
	},
});

export const authReducer = authSlice.reducer;
export const { authFullUser } = authSlice.actions;
export const authState = (state: RootState) => state.auth;
