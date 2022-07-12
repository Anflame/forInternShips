import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { PaintingsAPI } from "src/components/constants";
import { IPaintings, PaintingsState } from "./types";


const initialState: PaintingsState = {
    paintings: [],
    loading: false,
    error: '',
};

const paintingsSlice = createSlice({
    name: 'paintings',
    initialState,
    reducers: {
        getPaintings(state, action: PayloadAction<IPaintings[]>) {
        state.paintings = action.payload;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchDataPaintings.pending, (state) => {
          state.loading = true;
          state.error = '';
        })
  
        .addCase(
          fetchDataPaintings.fulfilled,
          (state, action: PayloadAction<IPaintings[]>) => {
            state.loading = false;
            state.paintings = action.payload;
          }
        )
  
        .addCase(fetchDataPaintings.rejected, (state, action: any) => {
          state.loading = false;
          state.error = action.error.message;
        });
    },
  });
  
  export const fetchDataPaintings = createAsyncThunk(
    'paintings/fetchPaintings',
    async (API: string) => {
      const response = await axios.get(`${PaintingsAPI}?${API}`);
      return response.data;
    }
  );
  
  export const { getPaintings } = paintingsSlice.actions;
  export const paintingsReducer = paintingsSlice.reducer;