import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { getRelatedMovies } from "../../../../api/Movie";
import { Card } from "../../../../components";
import styles from "./relatedMovie.module.scss";

// 연관된 영화 불러오기
const RelatedMovie = ({ movie }) => {
  const containerRef = useRef(null);
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

  // const onWheel = (e) => {
  //   const container = containerRef.current;
  //   container.scrollLeft += e.deltaY;
  // };

  // useEffect(() => {
  //   const element = document.querySelector(".listWrapper");
  //   if (element) {
  //     element.addEventListener("wheel", onWheel, { passive: false });

  //     return () => {
  //       element.removeEventListener("wheel", onWheel);
  //     };
  //   }
  // }, []);

  useEffect(() => {
    onGetRelatedMovie();
  }, [id]);

  if (!relatedMovie) {
    return null;
  }

  return (
    <section className={styles.wrapper}>
      <h2>연관된 영화</h2>

      <ul className={styles.listWrapper} ref={containerRef}>
        {relatedMovie.map((movie) => (
          <li key={movie.id} className={styles.card}>
            <Card className={styles.cardImg} movie={movie} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default RelatedMovie;
