import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ToastType = "success" | "error" | "info" | "warning";

interface ToastState {
    open: boolean;
    message: string;
    type: ToastType;
}

const initialState: ToastState = {
    open: false,
    message: "",
    type: "info",
};

const toastSlice = createSlice({
    name: "toast",
    initialState,
    reducers: {
        showToast: (
            state,
            action: PayloadAction<{ message: string; type: ToastType }>
        ) => {
            state.open = true;
            state.message = action.payload.message;
            state.type = action.payload.type;
        },
        hideToast: (state) => {
            state.open = false;
            state.message = "";
        },
    },
});

export const { showToast, hideToast } = toastSlice.actions;
export default toastSlice.reducer;
