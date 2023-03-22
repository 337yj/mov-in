import React, { memo, useState } from 'react';
import cx from 'classnames';
import { IconSearch } from '../../../assets';
import styles from './searchInput.module.scss';
import { useNavigate } from 'react-router-dom';

const SearchInput = ({ className, placeholder, ...props }) => {
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    // 검색 결과페이지로 이동
    navigate(`/searchResult`);
  };

  // 검색값
  const getValue = (e) => {
    const { value } = e.currentTarget;
    // e.target.value.toLowerCase())
    console.log(value);
    setSearchText(value);
  };

  return (
    <form className={cx(styles.searchForm, className)} onSubmit={onSubmit}>
      <input
        type="text"
        value={searchText}
        placeholder={placeholder}
        className={styles.searchInput}
        onChange={getValue}
        {...props}
      />
      <button type="button" className={styles.searchBtn}>
        <IconSearch className={styles.iconSearch} />
      </button>
    </form>
  );
};

export default memo(SearchInput);
