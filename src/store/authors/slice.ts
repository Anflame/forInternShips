import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthorsAPI } from "src/components/constants";
import { AuthorsState, IAuthors } from "./types";

const initialState: AuthorsState = {
    authors: [],
    loading: false,
    error: '',
};

const authorsSlice = createSlice({
    name: 'authors',
    initialState,
    reducers: {
      getAuthors(state, action: PayloadAction<IAuthors[]>) {
        state.authors = action.payload;
      }
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchDataAuthors.pending, (state) => {
          state.loading = true;
          state.error = '';
        })
  
        .addCase(
          fetchDataAuthors.fulfilled,
          (state, action: PayloadAction<IAuthors[]>) => {
            state.loading = false;
            state.authors = action.payload;
          }
        )
  
        .addCase(fetchDataAuthors.rejected, (state, action: any) => {
          state.loading = false;
          state.error = action.error.message;
        });
    },
});

export const fetchDataAuthors = createAsyncThunk(
    'authors/fetchAuthors',
    async () => {
      const response = await fetch(AuthorsAPI);
      const data = await response.json();
      return data;
  }
);
  
  export const { getAuthors } = authorsSlice.actions;
  export const authorsReducer = authorsSlice.reducer;