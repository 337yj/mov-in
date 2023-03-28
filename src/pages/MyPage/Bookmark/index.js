import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "../../../components/Common/Card";
// import CardPagi from "../../../components/CardPagi";
// import Card from "../../../components/Common/Card";
import Paging from "../../../components/Common/Pagination";
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/mock/fake.json");
        const posts = response.data.posts;
        const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
        setPosts(posts);
        setCurrentPosts(currentPosts);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [indexOfFirstPost, indexOfLastPost, page]);

  return (
    <section className={styles.wrapper}>
      <h2 className={styles.title}>{posts.length}개를 '북마크' 했어요 !</h2>
      <ul className={styles.gridContainer}>
        {currentPosts.map((movie) => (
          <li key={movie.id}>
            <Card movie={movie} />
          </li>
        ))}
      </ul>
      <Paging
        totalCount={posts.length}
        page={page}
        postPerPage={postPerPage}
        pageRangeDisplayed={5}
        onChange={onChange}
      />
    </section>
  );
};

export default Bookmark;
