import React, { useEffect, useState } from "react";
import { getMoviesMeLike } from "../../../api/Movie";
import Card from "../../../components/Common/Card";
import Paging from "../../../components/Common/Pagination";
import styles from "./like.module.scss";

const POST_PER_PAGE = 10;

const Like = () => {
  const [movies, setMovies] = useState([]);
  const [currentMovies, setCurrentMovies] = useState([]);
  const [page, setPage] = useState(1);
  const indexOfLastPost = page * POST_PER_PAGE;
  const indexOfFirstPost = indexOfLastPost - POST_PER_PAGE;
  const [totalCount, setTotalCount] = useState(0);

  const onChange = (page) => {
    setPage(page);
  };

  const onGetMovies = async () => {
    const response = await getMoviesMeLike(page, POST_PER_PAGE);
    if (response.status === 200) {
      const movie = [...response.data];
      setMovies(movie);
      setCurrentMovies(movie);
    }
  };

  const onGetMoviesCount = async () => {
    const response = await getMoviesMeLike();
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
        <span>{totalCount}</span>개의 영화를 '좋아요' 했어요 !
      </h2>
      <ul className={styles.gridContainer}>
        {currentMovies.slice(indexOfFirstPost, indexOfLastPost).map((movie) => (
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

export default Like;