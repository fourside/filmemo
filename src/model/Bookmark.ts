import { Note } from "./Note";

export type Bookmark = {
  id?: string;
  imdbID: string;
  title: string;
  posterURL: string;
  owner: string;
  createdAt?: Date;
  note?: Note;
};
