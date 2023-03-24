import React from "react";

import { LikeCount, CommentCount } from "../_shared";

import styles from "./footer.module.scss";

const CommentFooter = ({ date, ...props }) => {
  return (
    <section className={styles.commentFooter}>
      <hr className={styles.horizontalLine} />
      <content className={styles.footerContent}>
        <output className={styles.count}>
          <LikeCount />
          <CommentCount />
        </output>
        <output className={styles.date}>{date}</output>
      </content>
    </section>
  );
};

export default CommentFooter;
