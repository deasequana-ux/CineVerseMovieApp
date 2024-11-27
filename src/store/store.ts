import { configureStore } from '@reduxjs/toolkit';
import movieReducer from './slices/movieFilterSlice';

const store = configureStore({
  reducer: {
    movie: movieReducer,
  },
});

export default store;