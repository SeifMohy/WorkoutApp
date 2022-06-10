import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "store/rootReducer";


interface WORKOUTState {
	daysWorkout: number;
}

const initialState: WORKOUTState = {
	daysWorkout: 1,
};

const workoutSlice = createSlice({
	name: "workout",
	initialState,
	reducers: {
		workoutHistory: (state:WORKOUTState, {payload}:PayloadAction<number>) => {
			state.daysWorkout = payload;
		},
    },
    
});

export const workoutReducer = workoutSlice.reducer;
export const { workoutHistory } = workoutSlice.actions;
export const workoutState = (state: RootState) => state.workout;
