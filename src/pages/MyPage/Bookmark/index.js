import React, { useEffect, useState } from "react";
import { getMyBookmarks } from "../../../api/Bookmark";
import Card from "../../../components/Common/Card";
import Paging from "../../../components/Common/Pagination";
import styles from "./bookmark.module.scss";

//NOTE: 페이지당 포스트 개수와 같이 변하지 않는 값 -> 상수로 선언
const POST_PER_PAGE = 10;

const Bookmark = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1); // 현재 페이지
  const [totalCount, setTotalCount] = useState(0);

  const onChange = (page) => {
    setPage(page);
  };

  const onGetMovies = async () => {
    const response = await getMyBookmarks();
    if (response.status === 200) {
      const movie = [...response.data];
      setMovies(movie);
    }
  };

  const onGetMoviesCount = async () => {
    const response = await getMyBookmarks();
    if (response.status === 200) {
      setTotalCount(response.data.length);
    }
  };

  useEffect(() => {
    onGetMovies();
    onGetMoviesCount();
  }, []);

  return (
    <section className={styles.wrapper}>
      <h2 className={styles.title}>
        <span>{totalCount}</span>개의 영화를 '북마크' 했어요 !
      </h2>
      <div className={styles.gridContainer}>
        {movies.map((movie) => (
            <Card movie={movie} />
        ))}
      </div>
      <Paging
        totalCount={totalCount}
        page={page}
        postPerPage={POST_PER_PAGE}
        pageRangeDisplayed={5}
        onChange={onChange}
      />
    </section>
  );
};

export default Bookmark;
