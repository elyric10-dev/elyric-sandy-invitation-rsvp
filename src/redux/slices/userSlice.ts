import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
    userData: Record<string, any>; // You can replace this with a more specific type if needed
}

const storedUserData = localStorage.getItem("userData");

const initialState: UserState = {
    userData: storedUserData ? JSON.parse(storedUserData) : {},
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserData: (state, action: PayloadAction<Record<string, any>>) => {
            state.userData = action.payload;
            localStorage.setItem("userData", JSON.stringify(action.payload));
        },
        clearUserData: (state) => {
          state.userData = {};
          localStorage.removeItem("userData");
        },
    },
});

export const { setUserData, clearUserData } = userSlice.actions;
export default userSlice.reducer;
