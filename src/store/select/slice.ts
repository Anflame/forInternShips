import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SelectorsState {
  name: string,
  author: number,
  location: number,
  dateFrom: string,
  dateTo: string,
  page: number,
  limit: number,
}

const initialState: SelectorsState = {
  name: '',
  author: 0,
  location: 0,
  dateFrom: '',
  dateTo: '',
  page: 1,
  limit: 12,
};

const selectSlice = createSlice({
  name: 'select',
  initialState,
  reducers: {
    selectName: (state, actions: PayloadAction<string>) => {
      state.name = actions.payload;
    },
    selectAuthor: (state, actions: PayloadAction<number>) => {
      state.author = actions.payload;
    },
    selectLocation: (state, actions: PayloadAction<number>) => {
      state.location = actions.payload;
    },
    selectDateFrom: (state, actions: PayloadAction<string>) => {
      state.dateFrom = actions.payload;
    },
    selectDateTo: (state, actions: PayloadAction<string>) => {
      state.dateTo = actions.payload;
    },
    selectPage: (state, actions: PayloadAction<number>) => {
      state.page = actions.payload;
    },
    selectLimit: (state, actions: PayloadAction<number>) => {
      state.limit = actions.payload;
    },
  },
});

export const { selectName, selectAuthor, selectLocation, selectDateFrom, selectDateTo, selectPage, selectLimit } = selectSlice.actions;
export const selectReducer = selectSlice.reducer;