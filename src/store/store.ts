import { configureStore } from "@reduxjs/toolkit";
import movieFilterReducer from "./slices/movieFilterSlice";
import { TypedUseSelectorHook, useSelector as useAppSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    movie: movieFilterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const  useSelector : TypedUseSelectorHook<RootState> = useAppSelector;
