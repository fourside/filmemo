import { API } from "aws-amplify";
import awsmobile from "../aws-exports";
import { Film, FilmDetail } from "../model/Film";
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
