import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const api = (mediaCategory, page) => {
  return {
    method: "GET",
    url: `${import.meta.env.VITE_BASE_TMDB_URL}/movie/${mediaCategory}`,
    params: { language: "en-US", page },
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN} `,
    },
  };
};
const genreApi = () => {
  return {
    method: "GET",
    url: `${import.meta.env.VITE_BASE_TMDB_URL}/genre/movie/list`,
    params: { language: "en" },
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN} `,
    },
  };
};
export const getPopularMovies = createAsyncThunk(
  "/getPopularMovies",
  async (page, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const { data } = await axios.request(api("popular", page));
      return data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const getTopRatedMovies = createAsyncThunk(
  "/getTopRatedMovies",
  async (page, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const { data } = await axios.request(api("top_rated", page));
      return data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const getGenreMoviesList = createAsyncThunk(
  "/getGenreMoviesList",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const { data } = await axios.request(genreApi());
      return data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

const initialState = {
  popularMovies: [],
  popularMoviesLoading: true,
  popularMoviesErr: null,
  topRatedMovies: [],
  topRatedMoviesLoading: true,
  topRatedMoviesErr: null,
  isItPopular: true,
  popularMoviesVisible: 20,
  popularMoviesPage: 1,
  topRatedMoviesVisible: 20,
  topRatedMoviesPage: 1,
  genreMovieList: [],
  genreLoading: true,
  genreErr: null,
};
const MoviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    changeToPopular: (state) => {
      state.isItPopular = true;
    },
    changeToTopRated: (state) => {
      state.isItPopular = false;
    },
    popularLoadMore: (state) => {
      state.popularMoviesVisible += 20;
      state.popularMoviesPage += 1;
    },
    topRatedLoadMore: (state) => {
      state.topRatedMoviesVisible += 20;
      state.topRatedMoviesPage += 1;
    },
  },
  extraReducers: (builder) => {
    // get popular movies
    builder.addCase(getPopularMovies.pending, (state) => {
      state.popularMoviesLoading = true;
    });
    builder.addCase(getPopularMovies.fulfilled, (state, { payload }) => {
      state.popularMoviesLoading = false;
      state.popularMovies = state.popularMovies.concat(payload.results);
    });

    builder.addCase(getPopularMovies.rejected, (state, action) => {
      state.popularMoviesLoading = false;
      state.popularMoviesErr =
        action.payload?.message || "something went error";
    });

    // get top rated movies
    builder.addCase(getTopRatedMovies.pending, (state) => {
      state.topRatedMoviesLoading = true;
    });
    builder.addCase(getTopRatedMovies.fulfilled, (state, action) => {
      state.topRatedMoviesLoading = false;
      state.topRatedMovies = state.topRatedMovies.concat(
        action.payload.results
      );
    });
    builder.addCase(getTopRatedMovies.rejected, (state, action) => {
      state.topRatedMoviesLoading = false;
      state.topRatedMoviesErr =
        action.payload?.message || "something went error";
    });

    // get genre list movies
    builder.addCase(getGenreMoviesList.pending, (state) => {
      state.genreLoading = true;
    });
    builder.addCase(getGenreMoviesList.fulfilled, (state, action) => {
      state.genreLoading = false;
      state.genreMovieList = action.payload.genres;
    });

    builder.addCase(getGenreMoviesList.rejected, (state, action) => {
      state.genreLoading = false;
      state.genreErr = action.payload?.message || "something went error";
    });
  },
});
export const moviesReducer = MoviesSlice.reducer;
export const {
  changeToPopular,
  changeToTopRated,
  popularLoadMore,
  topRatedLoadMore,
} = MoviesSlice.actions;
