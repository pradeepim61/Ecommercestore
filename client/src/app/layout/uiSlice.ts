import { createSlice } from "@reduxjs/toolkit";

export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        isLoading: false
    },
    reducers: {
        startLoading: (state: { isLoading: boolean; }) => {
            state.isLoading = true;
        },
        stopLoading: (state: { isLoading: boolean; }) => {
            state.isLoading = false;
        }
    }
});

export const { startLoading, stopLoading } = uiSlice.actions;