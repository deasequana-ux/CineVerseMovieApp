import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { MovieStateProps } from "../../types/movies";

const API_URL = "https://www.omdbapi.com/";
const API_KEY = "468c3b7e";

export const fetchMovieDetails = createAsyncThunk(
  "movies/fetchMovieDetails",
  async (id: string) => {
    const response = await axios.get(API_URL, {
      params: {
        apikey: API_KEY,
        i: id,
      },
    });

    if (response.data.Response === "False") {
      throw new Error(response.data.Error);
    }

    return response.data;
  }
);

export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async ({ Search, Type, Year, Page }: { Search: string; Type: string; Year: string; Page: number }) => {
    const response = await axios.get(API_URL, {
      params: {
        apikey: API_KEY,
        s: Search,
        Type,
        y: Year || "",
        Page,
      },
    });

    if (response.data.Response === "False") {
      throw new Error(response.data.Error);
    }

    return response.data;
  }
);

const initialState :MovieStateProps={
  Movie:null,
  MoviesLoading:false,
  MovieLoading:false,
  Movies:[],
  MovieError:"",
  MoviesError:"",
  Search:"Pokemon",
  Page:1,
  Type:"movie",
  Year:"",
  TotalPage:0
}

const movieFilterSlice = createSlice({
  name: "movieFilter",
  initialState:initialState,
  reducers: {
    setSearch: (state, action) => {
      state.Search = action.payload;
    },
    setType: (state, action) => {
      state.Type = action.payload;
    },
    setYear: (state, action) => {
      state.Year = action.payload;
    },
    setPage: (state, action) => {
      state.Page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.MoviesLoading = true;
        state.MoviesError = "";
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.Movies = action.payload.Search;
        state.TotalPage = Math.ceil(action.payload.totalResults / 10);
        state.MoviesLoading = false;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.MoviesError = action.error.message || "Something went wrong";
        state.Movies = [];
        state.TotalPage = 1;
        state.MoviesLoading = false;
      })
      .addCase(fetchMovieDetails.pending, (state) => {
        state.MovieLoading = true;
        state.MovieError = "";
      })
      .addCase(fetchMovieDetails.fulfilled, (state, action) => {
        state.MovieLoading = false;
        state.Movie = action.payload;
      })
      .addCase(fetchMovieDetails.rejected, (state, action) => {
        state.MovieLoading = false;
        state.Movie = null;
        state.MovieError = action.error.message || "Something went wrong";
      });
  },
});

export const { setSearch, setType, setYear, setPage } = movieFilterSlice.actions;

export default movieFilterSlice.reducer;
