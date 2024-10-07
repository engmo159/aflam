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

const initialState = {
  personDetails: {},
  personDetailsLoading: false,
  personDetailsErr: null,
};

const personDetailsSlice = createSlice({
  name: "personDetails",
  initialState,
  reducers: {},
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
  },
});

export const personDetailsReducer = personDetailsSlice.reducer;
export const {} = personDetailsSlice.actions;
