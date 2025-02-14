import { configureStore } from "@reduxjs/toolkit";
import dashboardReducer from "./slices/dashboardSlices";
import userReducer from "./slices/userSlice";

export const store = configureStore({
    reducer: {
        dashboard: dashboardReducer,
        user: userReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
