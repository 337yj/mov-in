import React from "react";
import styles from "./card.module.scss";

const Poster = ({ movie }) => {
  return (
    <div className={styles.wrapper}>
      <img src={movie.image} alt="thumbnail"/>
    </div>
  );
};
export default Poster;
