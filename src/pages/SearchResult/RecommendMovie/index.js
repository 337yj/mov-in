import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { getRelatedMovies } from "../../../api/Movie";
import { Card } from "../../../components";
import styles from "./recommendMovie.module.scss";

// 연관된 영화 불러오기
const RecommendMovie = ({ movie }) => {
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
  const handleScroll = (e) => {
    const container = containerRef.current;
    container.scrollLeft += e.deltaY;
  };

  useEffect(() => {
    const element = document.querySelector(".grid");
    if (element) {
      element.addEventListener("wheel", handleScroll, { passive: false });

      return () => {
        element.removeEventListener("wheel", handleScroll);
      };
    }
  }, []);
  useEffect(() => {
    onGetRelatedMovie();
  }, [id]);

  if (!relatedMovie) {
    return null;
  }

  return (
    <section className={styles.wrapper} onWheel={handleScroll}>
      <h2>이런 영화는 어떠세요?</h2>
      <div className={styles.gridWrapper}>
        <ul className={styles.grid} ref={containerRef}>

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

export default RecommendMovie;
