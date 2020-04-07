import { API } from "aws-amplify";
import awsmobile from "../aws-exports";
API.configure(awsmobile);

const apiName = "searchomdb";

export async function searchByTitle(title: string) {
  const path = `/search?title=${title}`;
  return await API.get(apiName, path, {});
}

export async function searchById(imdbID: string) {
  const path = `/search?imdbID=${imdbID}`;
  return await API.get(apiName, path, {});
}
