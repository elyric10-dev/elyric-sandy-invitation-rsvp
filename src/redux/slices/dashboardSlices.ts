import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the shape of the state
interface DashboardState {
    dashboardData: Record<string, any>; // You can replace this with a more specific type if needed
}

// Define the initial state
const initialState: DashboardState = {
    dashboardData: {},
};

// Create the slice
const dashboardSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers: {
        setDashboardData: (state, action: PayloadAction<Record<string, any>>) => {
            state.dashboardData = action.payload;
        },
    },
});

// Export actions and reducer
export const { setDashboardData } = dashboardSlice.actions;
export default dashboardSlice.reducer;
