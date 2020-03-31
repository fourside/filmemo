import { createContext } from "react";
import { User, emptyUser } from "../model/User";

type UserContextValue = {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}
export const UserContext = createContext<UserContextValue>({
  user: emptyUser,
  setUser: () => {},
});
