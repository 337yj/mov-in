import React, { useEffect, useState } from "react";
import cx from "classnames";
import { Carousel } from "../../components";
import { getMovies, getMovie, getMoviesGenre, getMoviesTop  } from "../../api/Movie";
import styles from "./home.module.scss";

const Home = () => {
  const [movie, setMovie] = useState([]);
  const [topTen, setTopTen] = useState([]);
  const [genre, setGenre] = useState();

  const onGetMovies = async () => {
    try {
      const response = await getMovies();
      if (response.status === 200) {
        setMovie(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onGetTopTen = async () => {
    try {
      const response = await getMoviesTop();
      if (response.status === 200) {
        setTopTen(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onGetPerGenre =  async () => {
    try {
      const response = await getMoviesGenre();
      if (response.status === 200) {
        setGenre(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  console.log(topTen);

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
