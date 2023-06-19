import MainReducer from './reducers';
import { configureStore } from '@reduxjs/toolkit';
import stateConfig from "../config/state.config";

const store = configureStore({ /** Global State Initialization */
    reducer: MainReducer,
    preloadedState: stateConfig.initial_state,
    devTools: process.env.NODE_ENV === "production" ? false : true
});

/** Callback used to persist data in local storage if needed */
store.subscribe(() => { 
    const state = store.getState();
    localStorage.setItem("user_session", JSON.stringify(state.user_session));
});

export default store;