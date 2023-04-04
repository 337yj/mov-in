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

// const SearchInput = ({ className, placeholder, ...props }) => {
//   const [searchText, setSearchText] = useState("");
//   const navigate = useNavigate();

//   const onSubmit = (e) => {
//     e.preventDefault();
//     // 검색 결과페이지로 이동
//     navigate(`/searchResult?search=${searchText}`);
//     // `/searchResult/${searchText}`
//   };

//   // 검색값
//   const onChange = (e) => {
//     const { value } = e.currentTarget;
//     // e.target.value.toLowerCase())
//     console.log(value);
//     setSearchText(value);
//   };

//   return (
//     <form className={cx(styles.searchForm, className)} onSubmit={onSubmit}>
//       <input
//         type="text"
//         value={searchText}
//         placeholder={placeholder}
//         className={styles.searchInput}
//         onChange={onChange}
//         {...props}
//       />
//       <button type="submit" className={styles.searchBtn}>
//         <IconSearch className={styles.iconSearch} />
//       </button>
//     </form>
//   );
// };

// export default memo(SearchInput);
