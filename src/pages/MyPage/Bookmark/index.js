import React, { useEffect, useState } from "react";
import Card from "../../../components/Common/Card";
import Paging from "../../../components/Common/Pagination";
import { getBookmark, getMovies, getMoviesCount } from "../../../api/Movie";
import styles from "./bookmark.module.scss";

//NOTE: 페이지당 포스트 개수와 같이 변하지 않는 값 -> 상수로 선언
const POST_PER_PAGE = 10;

const Bookmark = () => {
  const [movies, setMovies] = useState([]);
  // const [posts, setPosts] = useState([]);
  // const [currentPosts, setCurrentPosts] = useState([]); // 보여줄 포스트
  const [page, setPage] = useState(1); // 현재 페이지
  // const indexOfLastPost = page * POST_PER_PAGE;
  // const indexOfFirstPost = indexOfLastPost - POST_PER_PAGE;
  const [totalCount, setTotalCount] = useState(0);

  const onChange = (page) => {
    setPage(page);
  };

  const onGetMovies = async () => {
    const response = await getBookmarks();
    if (response.status === 200) {
      const movie = [...response.data];
      setMovies(movie);
    }

    // try {
    //   const response = await getMovies(page, POST_PER_PAGE);
    //   if (response.status === 200) {
    //     const newPosts = response.data.data;
    //     setPosts([...posts, ...newPosts]); // 기존 데이터와 새로운 데이터를 합쳐서 저장
    //     setCurrentPosts([...posts, ...newPosts]); // 기존 데이터와 새로운 데이터를 합쳐서 현재 보여주는 데이터로 저장
    //   }
    // } catch (error) {
    //   console.error(error);
    // }
  };

  const onGetMoviesCount = async () => {
    const response = await getMoviesMeLike();
    if (response.status === 200) {
      setTotalCount(response.data.length);
    }
    // try {
    //   const response = await getMoviesCount();
    //   if (response.status === 200) {
    //     setTotalCount(response.data.count);
    //   }
    // } catch (error) {
    //   console.error(error);
    // }
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
      <div className={styles.gridContainer}>
        {movies.map((movie) => (
            <Card movie={movie} />
        ))}
      </div>
      {/* <ul className={styles.gridContainer}>
        {currentPosts.slice(indexOfFirstPost, indexOfLastPost).map((movie) => (
          <li key={movie.id}>
            <Card movie={movie} />
          </li>
        ))}
      </ul> */}
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
