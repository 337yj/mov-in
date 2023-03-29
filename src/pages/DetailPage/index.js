import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getMovie } from "../../api/Movie";
import styles from "./detail.module.scss";

const Detail = () => {
  const { title } = useParams();
  //NOTE: state => path variable  (/detail/:id)
  const { state: { movie } = {} } = useLocation();

  const onGetMovieDetail = async () => {
    try {
      const response = await getMovie(movie.id);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    onGetMovieDetail();
  }, [title]);
  console.log(movie.genres);
  return (
    <main>
      <div className={styles.backgroundWrapper}>
        <img
          className={styles.backgroundImg}
          src={movie.postImage}
          alt="thumbnail"
        />
      </div>
      <section className={styles.wrapper}>
        <div>
          <h1>{movie.title}</h1>
          <p>
            | {movie.runtime} | {movie.genres.name}
            {movie.genres.map((genre) => genre.name).join(", ")} |
            {movie.releasedAt}
          </p>
        </div>
        <article>
          <div>
            <img src={movie.postImage} alt="thumbnail"></img>
            {/* 버튼들 */}
          </div>
          <div>
            <p>평균평점</p>
            <p>출연/제작</p>
            <p>줄거리{movie.plot}</p>
          </div>
        </article>
      </section>
    </main>
  );
};

export default Detail;
