import { StoreState } from 'src/store';

export const selectActionName = (state: StoreState) => state.select.name;
export const selectActionAuthor = (state: StoreState) => state.select.author;
export const selectActionLocation = (state: StoreState) => state.select.location;
export const selectActionDateFrom = (state: StoreState) => state.select.dateFrom;
export const selectActionDateTo = (state: StoreState) => state.select.dateTo;
export const selectActionPage = (state: StoreState) => state.select.page;
export const selectActionLimit = (state: StoreState) => state.select.limit;