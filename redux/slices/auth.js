import { createSlice } from "@reduxjs/toolkit";

export const auth = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.loading = false;
    },
    error: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setUser, setLoading, error } = auth.actions;

export default auth.reducer;
