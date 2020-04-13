import { API, graphqlOperation } from "aws-amplify";
import awsmobile from "../aws-exports";
import { Film, FilmDetail } from "../model/Film";
import * as mutations from "../graphql/mutations";
import * as queries from "../graphql/queries";
import { Bookmark } from "../model/Bookmark";
import { Note } from "../model/Note";

API.configure(awsmobile);

const apiName = "searchomdb";

export async function searchByTitle(title: string) {
  const path = `/search?title=${title}`;
  const response = await API.get(apiName, path, {});
  if (response.Response === "False") {
    throw new Error(response.Error);
  }
  return response.Search as Film[];
}

export async function searchById(imdbID: string) {
  const path = `/search?imdbID=${imdbID}`;
  const response = await API.get(apiName, path, {});
  if (response.Response === "False") {
    throw new Error(response.Error);
  }
  return response as FilmDetail;
}

export async function getBookmark(imdbID: string) {
  const result = await graphql(queries.bookmarksByImdbId, { imdbID });
  const items = result.data.bookmarksByImdbID.items;
  return items[0] as Bookmark;
}

export async function createBookmark(bookmark: Bookmark) {
  const input = { ...bookmark };
  const result = await graphql(mutations.createBookmark, { input });
  return result.data.createBookmark as Bookmark;
}

export async function deleteBookmark(id: string) {
  const input = { id };
  return graphql(mutations.deleteBookmark, { input });
}

export async function listBookmarks(owner: string, nextToken: string | null) {
  const result = await graphql(queries.bookmarksSortedByTimestamp, {
    owner,
    sortDirection: "DESC",
    limit: 10,
    nextToken,
  });
  const sortedByTimestamp = result.data.bookmarksSortedByTimestamp;
  return {
    bookmarks: sortedByTimestamp.items as Bookmark[],
    nextToken: sortedByTimestamp.nextToken as string,
  };
}

export async function createNote(note: Note) {
  const input = { ...note };
  const result = await graphql(mutations.createNote, { input });
  return result.data.createNote as Note;
}

export async function relateBookmark(bookmarkId: string, noteId: string) {
  const input = {
    id: bookmarkId,
    bookmarkNoteId: noteId,
  };
  const result = await graphql(mutations.updateBookmark, { input });
  return result.data.updateBookmark;
}

export async function editNote(note: Note) {
  const input = { ...note };
  const result = await graphql(mutations.updateNote, { input });
  return result.data.updateNote as Note;
}

async function graphql(query: string, variables: any) {
  try {
    return await API.graphql(graphqlOperation(query, variables));
  } catch (err) {
    const messages = err.errors.map((err: any) => err.message).join("\n");
    throw new Error(messages);
  }
}
