import React from "react";
import styles from "./commentDetail.module.scss";

const CommentDetail = () => {
  return (
    <main>
      <section className={styles.wrapper}>
        <h2>{영화제목}</h2>
        <h4>코멘트</h4>
        <p></p>
      </section>
    </main>
  );
};

export default CommentDetail;
