import React, { useEffect, useState } from "react";
import { getReviewMe, getReviewMePage } from "../../../api/Review";
import Card from "../../../components/Common/Card";
import Paging from "../../../components/Common/Pagination";
import styles from "./commentAndRating.module.scss";

const POST_PER_PAGE = 10;

const CommentAndRating = () => {
  const [movies, setMovies] = useState([]);
  // const [currentMovies, setCurrentMovies] = useState([]);
  const [page, setPage] = useState(1);
  const indexOfLastPost = page * POST_PER_PAGE;
  const indexOfFirstPost = indexOfLastPost - POST_PER_PAGE;
  const [totalCount, setTotalCount] = useState(0);

  const onChange = (page) => {
    setPage(page);
  };

  const onGetMovies = async () => {
    //NOTE: reviews/me/paging이 페이지네이션이 있는 "내 리뷰 불러오기" API 입니다.
    const response = await getReviewMePage(page, POST_PER_PAGE);
    if (response.status === 200) {
      //NOTE: getReviewMe는 review를 불러오기 때문에 response.data []=> { ... , movie}
      const movie = [...response.data.data];
      setMovies(movie);
      // setCurrentMovies(movie);
    }
  };

  const onGetMoviesCount = async () => {
    const response = await getReviewMe();
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
        <span>{totalCount}</span>개의 영화를 평가했어요 !
      </h2>
      <ul className={styles.gridContainer}>
        {/* {currentMovies
          .slice(indexOfFirstPost, indexOfLastPost)
          .map(({ movie }) => {
            return (
              <li key={movie.id}>
                <Card movie={movie} />
              </li>
            );
          })} */}
        {movies.map((review) => {
          return (
            <li key={review.id}>
              <Card movie={review.movie} />
            </li>
          );
        })}
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

export default CommentAndRating;
