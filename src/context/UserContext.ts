import { createContext } from "react";
import { User, emptyUser } from "../model/User";

export const UserContext = createContext<{ user: User }>({
  user: emptyUser,
});
