import React, { useState } from "react";
import { IconComment } from "../../../../../assets/icon/index";

import styles from "./commentCount.module.scss";

const CommentCount = () => {
  const [comment, setComment] = useState(0);

  return (
    <button className={styles.commentCount}>
      <IconComment />
      <span
        onClick={() => {
          setComment(comment + 1);
        }}
      >
        답글 {comment}개
      </span>
    </button>
  );
};

export default CommentCount;
