import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
// api s
const api = ({ mediaCategory, mediaId }) => {
  return {
    method: 'GET',
    url: `${import.meta.env.VITE_BASE_TMDB_URL}/${mediaCategory}/${mediaId}`,
    params: { language: 'en-US' },
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN} `,
    },
  }
}
const videoApi = ({ mediaCategory, mediaId }) => {
  return {
    method: 'GET',
    url: `${
      import.meta.env.VITE_BASE_TMDB_URL
    }/${mediaCategory}/${mediaId}/videos`,
    params: { language: 'en-US' },
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN} `,
    },
  }
}
const creditsApi = ({ mediaCategory, mediaId }) => {
  return {
    method: 'GET',
    url: `${
      import.meta.env.VITE_BASE_TMDB_URL
    }/${mediaCategory}/${mediaId}/credits`,
    params: { language: 'en-US' },
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN} `,
    },
  }
}

const imageApi = ({ mediaCategory, mediaId }) => {
  return {
    method: 'GET',
    url: `${
      import.meta.env.VITE_BASE_TMDB_URL
    }/${mediaCategory}/${mediaId}/images`,
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN} `,
    },
  }
}
const reviewApi = ({ mediaCategory, mediaId, page }) => {
  return {
    method: 'GET',
    url: `${
      import.meta.env.VITE_BASE_TMDB_URL
    }/${mediaCategory}/${mediaId}/reviews`,
    params: { language: 'en-US', page },
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN} `,
    },
  }
}

// functions
export const getMediaDetails = createAsyncThunk(
  '/getMediaDetails',
  async ({ mediaCategory, mediaId }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    try {
      const { data } = await axios.request(api({ mediaCategory, mediaId }))
      return data
    } catch (e) {
      return rejectWithValue(e)
    }
  }
)
export const getCreditDetails = createAsyncThunk(
  '/getCreditDetails',
  async ({ mediaCategory, mediaId }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    try {
      const { data } = await axios.request(
        creditsApi({ mediaCategory, mediaId })
      )
      return data
    } catch (e) {
      return rejectWithValue(e)
    }
  }
)
export const getVideoDetails = createAsyncThunk(
  '/getVideoDetails',
  async ({ mediaCategory, mediaId }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    try {
      const { data } = await axios.request(videoApi({ mediaCategory, mediaId }))
      return data
    } catch (e) {
      return rejectWithValue(e)
    }
  }
)

export const getImageDetails = createAsyncThunk(
  '/getImageDetails',
  async ({ mediaCategory, mediaId }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    try {
      const { data } = await axios.request(imageApi({ mediaCategory, mediaId }))
      return data
    } catch (e) {
      return rejectWithValue(e)
    }
  }
)


const initialState = {
  mediaDetail: {},
  mediaDetailLoading: false,
  mediaDetailErr: null,
  castDetail: {},
  crewDetail: {},
  creditDetailLoading: false,
  creditDetailErr: null,
  videoDetail: [],
  videoDetailLoading: false,
  videoDetailErr: null,

  backdropDetail: [],
  backdropDetailLoading: false,
  backdropDetailErr: null,
  logoDetail: [],
  logoDetailLoading: false,
  logoDetailErr: null,
  posterDetail: [],
  posterDetailLoading: false,
  posterDetailErr: null,

}
const mediaDetailsSlice = createSlice({
  name: 'mediaDetails',
  initialState,
  reducers: {},
  extraReducers: builder => {
    // get media detail
    builder.addCase(getMediaDetails.pending, state => {
      state.mediaDetailLoading = true
    })
    builder.addCase(getMediaDetails.fulfilled, (state, { payload }) => {
      state.mediaDetailLoading = false
      state.mediaDetail = payload
    })
    builder.addCase(getMediaDetails.rejected, (state, action) => {
      state.mediaDetailLoading = false
      state.mediaDetailErr = action.payload?.message || 'something went error'
    })
    // get credit detail
    builder.addCase(getCreditDetails.pending, state => {
      state.creditDetailLoading = true
    })
    builder.addCase(getCreditDetails.fulfilled, (state, { payload }) => {
      state.creditDetailLoading = false
      state.castDetail = payload.cast
      state.crewDetail = payload.crew
    })
    builder.addCase(getCreditDetails.rejected, (state, action) => {
      state.creditDetailLoading = false
      state.creditDetailErr = action.payload?.message || 'something went error'
    })
    // get video detail
    builder.addCase(getVideoDetails.pending, state => {
      state.videoDetailLoading = true
    })
    builder.addCase(getVideoDetails.fulfilled, (state, { payload }) => {
      state.videoDetailLoading = false
      state.videoDetail = payload.results
    })
    builder.addCase(getVideoDetails.rejected, (state, action) => {
      state.videoDetailLoading = false
      state.videoDetailErr = action.payload?.message || 'something went error'
    })

    // get images detail
    builder.addCase(getImageDetails.pending, state => {
      state.backdropDetailLoading = true
      state.logoDetailLoading = true
      state.posterDetailLoading = true
    })
    builder.addCase(getImageDetails.fulfilled, (state, { payload }) => {
      state.backdropDetailLoading = false
      state.logoDetailLoading = false
      state.posterDetailLoading = false
      state.backdropDetail = payload.backdrops
      state.logoDetail = payload.logos
      state.posterDetail = payload.posters
    })
    builder.addCase(getImageDetails.rejected, (state, action) => {
      state.backdropDetailLoading = false
      state.logoDetailLoading = false
      state.posterDetailLoading = false
      state.backdropDetailErr =
        action.payload?.message || 'something went error'
      state.logoDetailErr = action.payload?.message || 'something went error'
      state.posterDetailErr = action.payload?.message || 'something went error'
    })

  },
})
export const mediaDetailReducer = mediaDetailsSlice.reducer
// export const {} = mediaDetailsSlice.actions
