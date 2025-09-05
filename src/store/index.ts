import { configureStore } from "@reduxjs/toolkit";

import toastReducer from "./toastSlice";
import alertReducer from "./alertSlice";

export const store = configureStore({
    reducer: {
        toast: toastReducer,
        alert: alertReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
