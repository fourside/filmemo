import { API, graphqlOperation } from "aws-amplify";
import awsmobile from "../aws-exports";
import { Film, FilmDetail } from "../model/Film";
import * as mutations from "../graphql/mutations";
import * as queries from "../graphql/queries";
import { Bookmark } from "../model/Bookmark";

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
  try {
    const result = await API.graphql(graphqlOperation(queries.bookmarksByImdbId, { imdbID }));
    const items = result.data.bookmarksByImdbID.items;
    return items[0] as Bookmark;
  } catch (err) {
    const messages = err.errors.map((err: any) => err.message).join("\n");
    throw new Error(messages);
  }
}

export async function createBookmark(bookmark: Bookmark) {
  const input = { ...bookmark };
  try {
    const result = await API.graphql(graphqlOperation(mutations.createBookmark, { input }));
    return result.data.createBookmark as Bookmark;
  } catch (err) {
    const messages = err.errors.map((err: any) => err.message).join("\n");
    throw new Error(messages);
  }
}

export async function deleteBookmark(id: string) {
  const input = { id };
  try {
    return API.graphql(graphqlOperation(mutations.deleteBookmark, { input }));
  } catch (err) {
    const messages = err.errors.map((err: any) => err.message).join("\n");
    throw new Error(messages);
  }
}

export async function listBookmarks() {
  try {
    const result = await API.graphql(graphqlOperation(queries.listBookmarks));
    return result.data.listBookmarks.items as Bookmark[];
  } catch (err) {
    const messages = err.errors.map((err: any) => err.message).join("\n");
    throw new Error(messages);
  }
}
