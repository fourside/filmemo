import React, { useContext } from 'react';
import { signOut } from "../amplify/Auth";
import { SearchForm } from "./SearchForm";
import { UserContext } from "../context/UserContext";

const UserPage: React.FC = () => {
  const { user } = useContext(UserContext);

  return (
    <>
      <h2>user page</h2>
      <h3>hello, {user.name}</h3>
      <button onClick={signOut}>Sign Out</button>
      <SearchForm />
    </>
  );
};

export default UserPage;
