import { combineReducers } from "@reduxjs/toolkit";
import { authReducer } from "slices/auth.slice";
import { workoutReducer } from "slices/workout.slice";


export const rootReducer = combineReducers({
	workout: workoutReducer,
	auth: authReducer,
});


export type RootState = ReturnType<typeof rootReducer>;
