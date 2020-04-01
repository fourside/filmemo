import React, { useState } from 'react';
import { SearchForm } from "./SearchForm";
import { search } from '../amplify/API';

const UserPage: React.FC = () => {
  const [result, setResult] = useState({});
  const [processing, setProcessing] = useState(false);

  const handleSearch = async (title: string) => {
    setProcessing(true);
    const result = await search(title);
    setResult(result);
    setProcessing(false);
  };

  return (
    <>
      <SearchForm processing={processing} handleSearch={handleSearch} />
      {processing ? <div>searching...</div> : <pre>{JSON.stringify(result, null, 2)}</pre>}

    </>
  );
};

export default UserPage;
