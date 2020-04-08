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
  const result = await API.graphql(graphqlOperation(queries.bookmarksByImdbId, { imdbID }));
  const items = result.data.bookmarksByImdbID.items;
  return items[0] as Bookmark;
}

export async function createBookmark(imdbID: string) {
  const input = { imdbID };
  const result = await API.graphql(graphqlOperation(mutations.createBookmark, { input }));
  if (result.data) {
    return result.data.createBookmark as Bookmark;
  }
  console.log(result);
  throw new Error(); // should be error message
}

export async function deleteBookmark(id: string) {
  const input = { id };
  return API.graphql(graphqlOperation(mutations.deleteBookmark, { input }));
}

export async function listBookmarks() {
  const result = await API.graphql(graphqlOperation(queries.listBookmarks));
  return result.data.listBookmarks.items as Bookmark[];
}
