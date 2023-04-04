import React, { useEffect, useState } from "react";
import cx from "classnames";
import { Carousel } from "../../components";
import styles from "./home.module.scss";

const Home = () => {  
  const [posts, setPosts] = useState([]);
  const [currentPosts, setCurrentPosts] = useState([]);

  //영화 장르별로 불러오기
  const getMoviesGenre = (genreIds) => {
    return apiClient.get(
      `/movies/genre?page=${page}&limit=${limit}&genreIds=${genreIds}`,
    );
  };

  // top10 영화 불러오기
  const getMoviesTop = () => {
    return apiClient.get(`/movies/top`);
  };

  // 영화 전체 수 불러오기
  const getMoviesCount = () => {
    return apiClient.get(`/movies/count`);
  };

  const onGetMovies = async () => {
    try {
      const response = await getMovies();
      if (response.status === 200) {
        const newPosts = response.data.data;
        setPosts([newPosts]);
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

  useEffect(() => {
    onGetMovies();
  }, []);

  return (
    <main className={styles.wrapper}>
      <section>
        <div>
          <img></img>
        </div>
        <div>
          <h2>인기 10위</h2>

        </div>
      </section>
    </main>
  );
};

export default Home;
