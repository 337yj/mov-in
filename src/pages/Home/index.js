import React, { useEffect, useState } from "react";
import cx from "classnames";
import { Carousel } from "../../components";
import { getMovies, getMovie, getMoviesGenre, getMoviesTop  } from "../../api/Movie";
import styles from "./home.module.scss";

const Home = () => {
  const [movie, setMovie] = useState([]);
  const [currentPosts, setCurrentPosts] = useState([]);

  // 전체 영화 목록 불러오기, limit 20개 까지(임의)
  const getMovies = (page = 1, limit = 20) => {
    return apiClient.get(`movies?page=${page}&limit=${limit}`);
  };

  // 장르별
  const getMoviesGenre = (page = 1, limit = 20, genreIds) => {
    return apiClient.get(
      `/movies/genre?page=${page}&limit=${limit}&genreIds=${genreIds}`,
    );
  };

  // top10
  const getMoviesTop = () => {
    return apiClient.get(`/movies/top`);
  };

  // 영화 디테일 불러오기
  const getMovie = (id) => {
    return apiClient.get(`/movies/${id}/detail`);
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
  };

  useEffect(() => {
    onGetMovies();
  }, []);

  return (
    <main className={styles.wrapper}>
      <section>
        <article>
          <img></img>
        </article>

        <article>
          <h2>인기 10위</h2>
          <div>
            <Carousel />
          </div>
        </article>
      </section>
    </main>
  );
};

export default Home;
