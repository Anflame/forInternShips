export interface IAuthors { 
    id: number;
    name: string;
}
export interface ILocations {
    id: number;
    location: string;
}
export interface AuthorsState {
    authors: IAuthors[],
    loading: boolean,
    error: string
}