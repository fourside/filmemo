export type AuthState = "authed" | "unauthed" | "unknown";

export type User = {
  id: string;
  name: string;
  owner: string;
  authed: AuthState;
};

export const emptyUser: User = {
  id: "",
  name: "",
  owner: "",
  authed: "unknown" as const,
};
