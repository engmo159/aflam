import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const api = (person_id) => {
  return {
    method: "GET",
    url: `${import.meta.env.VITE_BASE_TMDB_URL}/person/${person_id}`,
    params: { language: "en-US" },
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN} `,
    },
  };
};

const linksApi = (person_id) => {
  return {
    method: "GET",
    url: `${
      import.meta.env.VITE_BASE_TMDB_URL
    }/person/${person_id}/external_ids`,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN} `,
    },
  };
};

const imagesApi = (person_id) => {
  return {
    method: "GET",
    url: `${import.meta.env.VITE_BASE_TMDB_URL}/person/${person_id}/images`,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN} `,
    },
  };
};

const creditsApi = (person_id) => {
  return {
    method: "Get",
    url: `https://api.themoviedb.org/3/person/${person_id}/combined_credits`,
    params: { language: "en-US" },
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN} `,
    },
  };
};

export const getPersonDetails = createAsyncThunk(
  "/getPersonDetails",
  async (person_id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const { data } = await axios.request(api(person_id));
      return data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const getExternalDetails = createAsyncThunk(
  "/getExternalLinks",
  async (person_id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const { data } = await axios.request(linksApi(person_id));
      return data;
    } catch (e) {
      return rejectWithValue;
    }
  }
);

export const getPersonImages = createAsyncThunk(
  "/getPersonImages",
  async (person_id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const { data } = await axios.request(imagesApi(person_id));
      return data;
    } catch (e) {
      return rejectWithValue;
    }
  }
);

export const getCredits = createAsyncThunk(
  "/getCredits",
  async (person_id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const { data } = await axios.request(creditsApi(person_id));
      return data;
    } catch (e) {
      return rejectWithValue;
    }
  }
);

const initialState = {
  personDetails: {},
  personDetailsLoading: false,
  personDetailsErr: null,
  personExternals: {},
  personImages: {},
  personCredits: {},
  personCreditsLoading: false,
  personCreditsVisible: 20,
};

const personDetailsSlice = createSlice({
  name: "personDetails",
  initialState,
  reducers: {
    creditsLoadMore: (state) => {
      state.personCreditsVisible += 20;
    },
  },
  extraReducers: (builder) => {
    // person details
    builder.addCase(getPersonDetails.pending, (state) => {
      state.personDetailsLoading = true;
    });
    builder.addCase(getPersonDetails.fulfilled, (state, { payload }) => {
      state.personDetailsLoading = false;
      state.personDetails = payload;
    });
    builder.addCase(getPersonDetails.rejected, (state, action) => {
      state.personDetailsLoading = false;
      state.personDetailsErr =
        action.payload?.message || "something went error";
    });

    // person external links
    builder.addCase(getExternalDetails.pending, (state) => {
      state.personDetailsLoading = true;
    });
    builder.addCase(getExternalDetails.fulfilled, (state, { payload }) => {
      state.personDetailsLoading = false;
      state.personExternals = payload;
    });
    builder.addCase(getExternalDetails.rejected, (state, action) => {
      state.personDetailsLoading = false;
      state.personDetailsErr =
        action.payload?.message || "something went error";
    });

    // person images
    builder.addCase(getPersonImages.pending, (state) => {
      state.personDetailsLoading = true;
    });
    builder.addCase(getPersonImages.fulfilled, (state, { payload }) => {
      state.personDetailsLoading = false;
      state.personImages = payload.profiles;
    });
    builder.addCase(getPersonImages.rejected, (state, action) => {
      state.personDetailsLoading = false;
      state.personDetailsErr =
        action.payload?.message || "something went error";
    });

    // person credits
    builder.addCase(getCredits.pending, (state) => {
      state.personCreditsLoading = true;
    });
    builder.addCase(getCredits.fulfilled, (state, { payload }) => {
      state.personCreditsLoading = false;
      state.personCredits = payload.cast.concat(payload.crew);
    });
    builder.addCase(getCredits.rejected, (state, action) => {
      state.personCreditsLoading = false;
      state.personDetailsErr =
        action.payload?.message || "something went error";
    });
  },
});

export const personDetailsReducer = personDetailsSlice.reducer;
export const { creditsLoadMore } = personDetailsSlice.actions;
