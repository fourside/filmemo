import { API } from "aws-amplify";
import awsmobile from "../aws-exports";
API.configure(awsmobile);

const apiName = "searchomdb";

export async function search(title: string) {
  const path = `/search?title=${title}`;
  return await API.get(apiName, path, {});
}
