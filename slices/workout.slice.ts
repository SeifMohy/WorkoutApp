import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "store/rootReducer";


interface WorkoutState {
	daysWorkout: string;
}

const initialState: WorkoutState = {
	daysWorkout: "1",
};

const workoutSlice = createSlice({
	name: "workout",
	initialState,
	reducers: {
		todaysWorkout: (state:WorkoutState, {payload}:PayloadAction<string>) => {
			state.daysWorkout = payload;
		},
    },
    
});

export const workoutReducer = workoutSlice.reducer;
export const { todaysWorkout } = workoutSlice.actions;
export const workoutState = (state: RootState) => state.workout;
