import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type AlertType = "info" | "warning" | "error" | "confirm";

export interface AlertState {
    open: boolean;
    message: string;
    type: AlertType;
    confirmText?: string;
    cancelText?: string;
    onConfirm?: (() => void) | null;
    onCancel?: (() => void) | null;
}

const initialState: AlertState = {
    open: false,
    message: "",
    type: "info",
    confirmText: undefined,
    cancelText: undefined,
    onConfirm: null,
    onCancel: null,
};

const alertSlice = createSlice({
    name: "alert",
    initialState,
    reducers: {
        showAlert: (
            state,
            action: PayloadAction<{
                message: string;
                type?: AlertType;
                confirmText?: string;
                cancelText?: string;
                onConfirm?: (() => void) | null;
                onCancel?: (() => void) | null;
            }>
        ) => {
            state.open = true;
            state.message = action.payload.message;
            state.type = action.payload.type || "info";
            state.confirmText = action.payload.confirmText;
            state.cancelText = action.payload.cancelText;
            state.onConfirm = action.payload.onConfirm || null;
            state.onCancel = action.payload.onCancel || null;
        },
        hideAlert: (state) => {
            state.open = false;
            state.message = "";
            state.confirmText = undefined;
            state.cancelText = undefined;
            state.onConfirm = null;
            state.onCancel = null;
        },
    },
});

export const { showAlert, hideAlert } = alertSlice.actions;
export default alertSlice.reducer;
