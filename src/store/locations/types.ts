
export interface ILocations {
    id: number;
    location: string;
}

export interface LocationsState {
    locations: ILocations[];
    loading: boolean;
    error: string;
}