import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
const { REACT_APP_API_URL } = process.env;

export const Main = () => {
  const [searchParams ] = useSearchParams();
  const [ data, setData ] = useState([]);
  const searchValue = searchParams.get('q');
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`${REACT_APP_API_URL}/api/v1/search?q=${searchValue || ''}`);
      setData(response.data)
    }
    fetchData();
  }, [ searchValue ]);
  return (
    <>
    {
      data.results?.map(item => (
        <div key={item.id}>
          <h1>{item.title}</h1>
          <p>{item.content}</p>
        </div>
      ))
    }
    </>
  );
};
