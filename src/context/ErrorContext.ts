import { createContext } from "react";

type ErrorContextValue = {
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
}
export const ErrorContext = createContext<ErrorContextValue>({
  error: "",
  setError: () => {},
});

