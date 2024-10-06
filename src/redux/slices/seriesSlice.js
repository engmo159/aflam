import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const api = (mediaCategory, page) => {
  return {
    method: "GET",
    url: `${import.meta.env.VITE_BASE_TMDB_URL}/tv/${mediaCategory}`,
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
    url: `${import.meta.env.VITE_BASE_TMDB_URL}/genre/tv/list`,
    params: { language: "en" },
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN} `,
    },
  };
};
export const getPopularSeries = createAsyncThunk(
  "/getPopularSeries",
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

export const getTopRatedSeries = createAsyncThunk(
  "/getTopRatedSeries",
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

export const getGenreSeriesList = createAsyncThunk(
  "/getGenreSeriesList",
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
  popularSeries: [],
  popularSeriesLoading: true,
  popularSeriesErr: null,
  topRatedSeries: [],
  topRatedSeriesLoading: true,
  topRatedSeriesErr: null,
  seriesIsItPopular: true,
  popularSeriesVisible: 20,
  popularSeriesPage: 1,
  topRatedSeriesVisible: 20,
  topRatedSeriesPage: 1,
  genreSeriesList: [],
  genreLoading: true,
  genreErr: null,
};
const SeriesSlice = createSlice({
  name: "Series",
  initialState,
  reducers: {
    seriesChangeToPopular: (state) => {
      state.seriesIsItPopular = true;
    },
    seriesChangeToTopRated: (state) => {
      state.seriesIsItPopular = false;
    },
    popularSeriesLoadMore: (state) => {
      state.popularSeriesVisible += 20;
      state.popularSeriesPage += 1;
    },
    topRatedSeriesLoadMore: (state) => {
      state.topRatedSeriesVisible += 20;
      state.topRatedSeriesPage += 1;
    },
  },
  extraReducers: (builder) => {
    // get popular series
    builder.addCase(getPopularSeries.pending, (state) => {
      state.popularSeriesLoading = true;
    });
    builder.addCase(getPopularSeries.fulfilled, (state, { payload }) => {
      state.popularSeriesLoading = false;
      state.popularSeries = state.popularSeries.concat(payload.results);
    });

    builder.addCase(getPopularSeries.rejected, (state, action) => {
      state.popularSeriesLoading = false;
      state.popularSeriesErr =
        action.payload?.message || "something went error";
    });

    // get top rated series
    builder.addCase(getTopRatedSeries.pending, (state) => {
      state.topRatedSeriesLoading = true;
    });
    builder.addCase(getTopRatedSeries.fulfilled, (state, action) => {
      state.topRatedSeriesLoading = false;
      state.topRatedSeries = state.topRatedSeries.concat(
        action.payload.results
      );
    });
    builder.addCase(getTopRatedSeries.rejected, (state, action) => {
      state.topRatedSeriesLoading = false;
      state.topRatedSeriesErr =
        action.payload?.message || "something went error";
    });

    // get genre list tv
    builder.addCase(getGenreSeriesList.pending, (state) => {
      state.genreLoading = true;
    });
    builder.addCase(getGenreSeriesList.fulfilled, (state, action) => {
      state.genreLoading = false;
      state.genreSeriesList = action.payload.genres;
    });

    builder.addCase(getGenreSeriesList.rejected, (state, action) => {
      state.genreLoading = false;
      state.genreErr = action.payload?.message || "something went error";
    });
  },
});
export const seriesReducer = SeriesSlice.reducer;
export const {
  seriesChangeToPopular,
  seriesChangeToTopRated,
  popularSeriesLoadMore,
  topRatedSeriesLoadMore,
} = SeriesSlice.actions;
