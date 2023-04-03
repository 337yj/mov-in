import React from "react";
import { CommentOutput } from "../../..";
import styles from "./movieComment.module.scss";

const MovieComment = ({ movie, onChangeTab }) => {
  const onClickMovie = (id) => {
    onChangeTab("commentDetail");
  };
  return (
    <section className={styles.wrapper}>
      <h2>코멘트</h2>
      <Comment onClick={onClickMovie} />
      <div className={styles.btnWrapper}></div>
    </section>
  );
};

export default MovieComment;
