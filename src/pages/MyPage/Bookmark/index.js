import React, { useEffect, useState } from "react";
import { getMyBookmarks } from "../../../api/Bookmark";
import Card from "../../../components/Common/Card";
import Paging from "../../../components/Common/Pagination";
import styles from "./bookmark.module.scss";

//NOTE: 페이지당 포스트 개수와 같이 변하지 않는 값 -> 상수로 선언
const POST_PER_PAGE = 10;

const Bookmark = () => {
  const [movies, setMovies] = useState([]);
  const [currentMovies, setCurrentMovies] = useState([]);
  const [page, setPage] = useState(1); // 현재 페이지
  const indexOfLastPost = page * POST_PER_PAGE;
  const indexOfFirstPost = indexOfLastPost - POST_PER_PAGE;
  const [totalCount, setTotalCount] = useState(0);

  const onChange = (page) => {
    setPage(page);
  };

  const onGetMovies = async () => {
    const response = await getMyBookmarks(page, POST_PER_PAGE);
    if (response.status === 200) {
      //NOTE: API Response를 잘 확인하고 데이터로 사용을 해야한다.
      const movie = [...response.data];
      setMovies(movie);
      setCurrentMovies(movie);
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
  }, [page]);

  return (
    <section className={styles.wrapper}>
      <h2 className={styles.title}>
        <span>{totalCount}</span>개의 영화를 '북마크' 했어요 !
      </h2>
      <ul className={styles.gridContainer}>
        {currentMovies
          .slice(indexOfFirstPost, indexOfLastPost)
          .map(({ movie }) => (
            <li key={movie.id}>
              <Card movie={movie} />
            </li>
          ))}
      </ul>
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
