import { AuthorsState, IAuthors } from "../authors/types";

export interface IPaintings {
    authorId: number;
    created: string;
    id: number;
    imageUrl: string;
    locationId: number;
    name: string;
}
export interface PaintingsState {
    paintings: IPaintings[];
    loading: boolean;
    error: string;
}