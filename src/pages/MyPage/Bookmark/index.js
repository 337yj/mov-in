import React, { useEffect, useState } from "react";
import Card from "../../../components/Common/Card";
import Paging from "../../../components/Common/Pagination";
import { getMovies, getMoviesCount } from "../../../api/Movie";
import styles from "./bookmark.module.scss";

const Bookmark = () => {
  const [posts, setPosts] = useState([]);
  const [currentPosts, setCurrentPosts] = useState([]); // 보여줄 포스트
  const [page, setPage] = useState(1); // 현재 페이지
  const [postPerPage] = useState(10); // 페이지당 포스트 개수
  const indexOfLastPost = page * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const [totalCount, setTotalCount] = useState(0);

  const onChange = (page) => {
    setPage(page);
  };

  // 임시
  const onGetMovies = async () => {
    try {
      const response = await getMovies(page, postPerPage);
      if (response.status === 200) {
        const newPosts = response.data.data;
        setPosts([...posts, ...newPosts]); // 기존 데이터와 새로운 데이터를 합쳐서 저장
        setCurrentPosts([...posts, ...newPosts]); // 기존 데이터와 새로운 데이터를 합쳐서 현재 보여주는 데이터로 저장
      }
    } catch (error) {
      console.error(error);
    }
    // console.log(page);
    // console.log(postPerPage);
    // console.log(indexOfLastPost);
    // console.log(indexOfFirstPost);
    // console.log(posts);
  };

  const onGetMoviesCount = async () => {
    try {
      const response = await getMoviesCount();
      if (response.status === 200) {
        setTotalCount(response.data.count);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    onGetMovies();
    onGetMoviesCount();
  }, [page, postPerPage]);

  return (
    <section className={styles.wrapper}>
      <h2 className={styles.title}>{totalCount}개를 '북마크' 했어요 !</h2>
      <ul className={styles.gridContainer}>
        {currentPosts.slice(indexOfFirstPost, indexOfLastPost).map((movie) => (
          <li key={movie.id}>
            <Card movie={movie} />
          </li>
        ))}
      </ul>
      <Paging
        totalCount={totalCount}
        page={page}
        postPerPage={postPerPage}
        pageRangeDisplayed={5}
        onChange={onChange}
      />
    </section>
  );
};

export default Bookmark;
