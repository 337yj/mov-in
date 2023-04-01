import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRelatedMovies } from "../../../../api/Movie";
import { Card } from "../../../../components";
import styles from "./relatedMovie.module.scss";

// 연관된 영화 불러오기
const RelatedMovie = ({ movie }) => {
  const { id } = useParams();
  const [relatedMovie, setRelatedMovie] = useState();

  const onGetRelatedMovie = async () => {
    try {
      const response = await getRelatedMovies(id);
      if (response.status === 200) {
        setRelatedMovie(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    onGetRelatedMovie();
  }, [id]);

  if (!relatedMovie) {
    return null;
  }

  return (
    <section className={styles.wrapper}>
      <h2>연관된 영화</h2>
      <div className={styles.gridWrapper}>
        <ul className={styles.grid}>
          {/* 캐러셀로 대체 */}
          {relatedMovie.map((movie) => (
            <li key={movie.id} className={styles.card}>
              <Card className={styles.cardImg} movie={movie} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default RelatedMovie;
