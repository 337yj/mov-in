import React, { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconSearch } from "../../../../assets";
import cx from "classnames";
import styles from "./searchInput.module.scss";

const SearchInput = ({
  className,
  placeholder,
  onSubmit: onSubmitProps,
  isAdmin = false,
  ...props
}) => {
  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();

    onSubmitProps && onSubmitProps();
    onClick();
  };

  const onClick = () => {
    if (!isAdmin) {
      navigate("/searchResult", {
        state,
      });
    }
  };

  return (
    <form className={cx(styles.searchForm, className)} onSubmit={onSubmit}>
      <input
        type="text"
        placeholder={placeholder}
        className={styles.searchInput}
        {...props}
      />
      <button type="submit" className={styles.searchBtn}>
        <IconSearch className={styles.iconSearch} />
      </button>
    </form>
  );
};

export default memo(SearchInput);
