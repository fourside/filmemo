import React from 'react';
import { signOut } from "../amplify/Auth";
import { SearchForm } from './SearchForm';

const UserPage: React.FC = () => {
  return (
    <>
      <h2>user page</h2>
      <button onClick={signOut}>Sign Out</button>
      <SearchForm />
    </>
  );
};

export default UserPage;
