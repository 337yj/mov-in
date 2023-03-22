import React from 'react';
import { useParams } from 'react-router-dom';

const SearchResult = () => {
  const { searchText } = useParams();
  return <div>검색결과 : {searchText}</div>;
};

export default SearchResult;
