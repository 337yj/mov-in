import React, { useState } from "react";
import { IconLike } from "../../../../../assets/icon";

import cx from "classnames";
import styles from "./likeCount.module.scss";

const LikeCount = () => {
  const [like, setLike] = useState(0);
  const [onLikeClick, setOnLikeClick] = useState(false);

  const LikeClick = () => {
    if (onLikeClick) {
      setOnLikeClick(false);
    } else {
      setOnLikeClick(true);
    }
  };

  return (
    <button className={styles.likeCount}>
      <IconLike onClick={LikeClick} />
      <span
        className={styles.like}
        onClick={() => {
          setLike(like + 1);
        }}
      >
        좋아요 {like}개
      </span>
    </button>
  );
};

export default LikeCount;
