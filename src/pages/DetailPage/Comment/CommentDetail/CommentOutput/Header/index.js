import React from "react";
import Profile from "../_shared/Profile";

import styles from "./header.module.scss";

const CommentHeader = ({ profileImage, username, grade, ...props }) => {
  // props type 작성

  return (
    <header className={styles.commentHeader}>
      <Profile />
      <output className={styles.grade}>평점★{grade}</output>
    </header>
  );
};

export default CommentHeader;
