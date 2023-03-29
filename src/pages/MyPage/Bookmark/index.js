import React, { useEffect, useState } from "react";
import Card from "../../../components/Common/Card";
import Paging from "../../../components/Common/Pagination";
import { getMovies, getMoviesCount } from "../../../api/Movie";
import styles from "./bookmark.module.scss";

const Bookmark = () => {
  const [posts, setPosts] = useState([]); // axios로 받아온 데이터 저장
  const [currentPosts, setCurrentPosts] = useState([]); // 보여줄 포스트
  const [page, setPage] = useState(1); // 현재 페이지
  const onChange = (page) => {
    setPage(page);
  };
  const [postPerPage] = useState(10); // 페이지당 포스트 개수
  const indexOfLastPost = page * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const [totalCount, setTotalCount] = useState(0);

  const fetchData = async () => {
    try {
      const response = await getMovies(page, postPerPage);
      const posts = response.data.data;
      setPosts(posts);
      setCurrentPosts(posts.slice(indexOfFirstPost, indexOfLastPost));
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [page, postPerPage, posts, indexOfFirstPost, indexOfLastPost]);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const response = await getMoviesCount();
        setTotalCount(response.data.count);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCount();
  }, []);

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
