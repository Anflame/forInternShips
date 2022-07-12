import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LocationsAPI } from "src/components/constants";
import { ILocations, LocationsState } from "./types";


const initialState: LocationsState = {
    locations: [],
    loading: false,
    error: '',
};

const locationsSlice = createSlice({
    name: 'locations',
    initialState,
    reducers: {
        getLocations(state, action: PayloadAction<ILocations[]>) {
        state.locations = action.payload;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchDataLocations.pending, (state) => {
          state.loading = true;
          state.error = '';
        })
  
        .addCase(
            fetchDataLocations.fulfilled,
          (state, action: PayloadAction<ILocations[]>) => {
            state.loading = false;
            state.locations = action.payload;
          }
        )
  
        .addCase(fetchDataLocations.rejected, (state, action: any) => {
          state.loading = false;
          state.error = action.error.message;
        });
    },
  });
  
  export const fetchDataLocations = createAsyncThunk(
    'locations/fetchLocations',
    async () => {
      const response = await fetch(LocationsAPI);
      const data = await response.json();
      return data;
    }
  );
  
  export const { getLocations } = locationsSlice.actions;
  export const locationsReducer = locationsSlice.reducer;