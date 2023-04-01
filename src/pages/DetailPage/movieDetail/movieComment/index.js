import React from "react";
import { CommentOutput } from "../../..";
import styles from "./movieComment.module.scss";

const MovieComment = ({ movie }) => {
  return (
    <section className={styles.wrapper}>
      <h2>코멘트</h2>
      <CommentOutput />
      <div className={styles.btnWrapper}>
        {/* {movie.staffs.length > 8 && (
          <button
            className={styles.moreStaffsBtn}
            onClick={() => setShowAllStaffs(!showAllStaffs)}
          >
            {showAllStaffs ? "접기" : "더보기"}
          </button>
        )} */}
      </div>
    </section>
  );
};

export default MovieComment;
