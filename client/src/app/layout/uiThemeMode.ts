import { createSlice } from "@reduxjs/toolkit";

export const uiThemeMode = createSlice({
    name: 'uiThemeMode',
    initialState: {
        darkMode: false
    },
    reducers: {
        getInitialDarkMode: (state) => {
            const savedMode = localStorage.getItem('darkMode');
            state.darkMode = savedMode ? JSON.parse(savedMode) : true;
        },
        toggleDarkMode: (state) => {
            state.darkMode = !state.darkMode;
            localStorage.setItem('darkMode', JSON.stringify(state.darkMode));
        }
    }
});

export const { getInitialDarkMode, toggleDarkMode } = uiThemeMode.actions;