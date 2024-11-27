// movieSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  search: 'Pokemon', 
  type: 'movie',     
  year: null,         
  page: 1,            
};

const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setType: (state, action) => {
      state.type = action.payload;
    },
    setYear: (state, action) => {
      state.year = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
});

export const { setSearch, setType, setYear, setPage } = movieSlice.actions;
export default movieSlice.reducer;
