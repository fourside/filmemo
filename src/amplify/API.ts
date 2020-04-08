import { API, graphqlOperation } from "aws-amplify";
import awsmobile from "../aws-exports";
import { Film, FilmDetail } from "../model/Film";
import * as mutations from "../graphql/mutations";
import * as queries from "../graphql/queries";
import { Stock } from "../model/Stock";

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

export async function getStock(imdbID: string) {
  const result = await API.graphql(graphqlOperation(queries.stocksByImdbId, { imdbID }));
  const items = result.data.stocksByImdbID.items;
  return items[0] as Stock;
}

export async function createStock(imdbID: string) {
  const input = { imdbID };
  const result = await API.graphql(graphqlOperation(mutations.createStock, { input }));
  if (result.data) {
    return result.data.createStock as Stock;
  }
  console.log(result);
  throw new Error(); // should be error message
}

export async function deleteStock(id: string) {
  const input = { id };
  return API.graphql(graphqlOperation(mutations.deleteStock, { input }));
}

export async function listStock() {
  const result = await API.graphql(graphqlOperation(queries.listStocks));
  return result.data.listStocks.items as Stock[];
}
