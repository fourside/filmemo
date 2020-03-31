import React, { useState, FormEvent, ChangeEvent } from 'react';
import { search } from '../amplify/API';

export const SearchForm: React.FC = () => {
  const [form, setForm] = useState({
    title: "",
    processing: false,
  });
  const [result, setResult] = useState({});

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setForm({
      ...form,
      title: value,
    });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setForm({
      ...form,
      processing: true,
    });
    try {
      const result = await search(form.title);
      setResult(result);
    } catch (err) {
      console.log(err);
      setForm({
        ...form,
        processing: false,
      });
      return;
    }
    setForm({
      ...form,
      title: "",
      processing: false,
    });
  };

  if (form.processing) {
    return <div>searching...</div>
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={form.title} name="title" onChange={handleChange} />
      <button>search</button>
      <pre>{JSON.stringify(result, null, 2)}</pre>
    </form>
  );
};
