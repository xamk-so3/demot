import { configureStore } from '@reduxjs/toolkit';
import tehtavalistaReducer from './tehtavalistaSlice'; 

export const store = configureStore({
    reducer : {
        tehtavalista : tehtavalistaReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;