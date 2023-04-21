import React, { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconSearch } from "../../../assets";
import cx from "classnames";
import styles from "./searchInput.module.scss";

const SearchInput = ({ className, placeholder, ...props }) => {
  const [state, setState] = useState({ keyword: "", results: [] });
  const navigate = useNavigate();

  const onChange = (event) => {
    setState({ ...state, keyword: event.target.value });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    onClick();
    setState({ ...state, keyword: "" }); // 검색어 초기화
  };

  const onClick = () => {
    navigate("/searchResult", {
      state,
    });
  };

  return (
    <form className={cx(styles.searchForm, className)} onSubmit={onSubmit}>
      <input
        type="text"
        value={state.keyword}
        placeholder={placeholder}
        className={styles.searchInput}
        onChange={onChange}
        {...props}
      />
      <button type="submit" className={styles.searchBtn}>
        <IconSearch className={styles.iconSearch} />
      </button>
    </form>
  );
};

export default memo(SearchInput);
