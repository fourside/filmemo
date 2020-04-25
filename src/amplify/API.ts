import { API, graphqlOperation, GraphQLResult } from "@aws-amplify/api";
import awsmobile from "../aws-exports";
import { Film, FilmDetail } from "../model/Film";
import * as mutations from "../graphql/mutations";
import * as queries from "../graphql/queries";
import { Bookmark } from "../model/Bookmark";
import { Note } from "../model/Note";

API.configure(awsmobile);

const apiName = "searchomdb";

export async function searchByTitle(title: string, page = 1) {
  const path = `/search?title=${title}&page=${page}`;
  const response = await API.get(apiName, path, {});
  if (response.Response === "False") {
    throw new Error(response.Error);
  }
  const films = response.Search as Film[];
  const fetched = (page - 1) * 10 + films.length;
  const hasNext = parseInt(response.totalResults, 10) > fetched;
  return {
    films,
    hasNext,
  };
}

export async function searchById(imdbID: string) {
  const path = `/search?imdbID=${imdbID}`;
  const response = await API.get(apiName, path, {});
  if (response.Response === "False") {
    throw new Error(response.Error);
  }
  return response as FilmDetail;
}

type ListBookmarks = {
  [key: string]: {
    items: Bookmark[];
    nextToken: string;
  };
};

type BookmarkResponse = {
  [key: string]: Bookmark;
};

type NoteResponse = {
  [key: string]: Note;
};

export async function getBookmark(imdbID: string) {
  const result = await graphql<ListBookmarks>(queries.bookmarksByImdbId, { imdbID });
  const items = result.data?.bookmarksByImdbID.items;
  if (items) {
    return items[0];
  }
  throw new Error("no data");
}

export async function createBookmark(bookmark: Bookmark) {
  const input = { ...bookmark };
  const result = await graphql<BookmarkResponse>(mutations.createBookmark, { input });
  return result.data?.createBookmark as Bookmark;
}

export async function deleteBookmark(id: string) {
  const input = { id };
  return graphql(mutations.deleteBookmark, { input });
}

export async function listBookmarks(owner: string, nextToken: string | null) {
  const result = await graphql<ListBookmarks>(queries.bookmarksSortedByTimestamp, {
    owner,
    sortDirection: "DESC",
    limit: 10,
    nextToken,
  });
  const sortedByTimestamp = result.data?.bookmarksSortedByTimestamp;
  return {
    bookmarks: sortedByTimestamp?.items as Bookmark[],
    nextToken: sortedByTimestamp?.nextToken as string,
  };
}

export async function createNote(note: Note) {
  const input = { ...note };
  const result = await graphql<NoteResponse>(mutations.createNote, { input });
  return result.data?.createNote as Required<Note>;
}

export async function relateBookmark(bookmarkId: string, noteId: string) {
  const input = {
    id: bookmarkId,
    bookmarkNoteId: noteId,
  };
  const result = await graphql<BookmarkResponse>(mutations.updateBookmark, { input });
  return result.data?.updateBookmark;
}

export async function editNote(note: Note) {
  const input = { ...note };
  const result = await graphql<NoteResponse>(mutations.updateNote, { input });
  return result.data?.updateNote as Required<Note>;
}

async function graphql<T>(query: string, variables: any) {
  try {
    const result = await API.graphql(graphqlOperation(query, variables)) as GraphQLResult<T>;
    if (!result.data) {
      throw new Error("no data");
    }
    return result;
  } catch (err) {
    const messages = err.errors.map((err: any) => err.message).join("\n");
    throw new Error(messages);
  }
}
