import React, { useState } from "react";

import {
  IconHeartEmpty,
  IconHeartFull,
} from "../../../../../../../assets/icon";

import styles from "./likeCount.module.scss";

const LikeButton = () => {
  const [like, setLike] = useState(0);
  const [onIconClick, setOnIconClick] = useState(false);

  const onClick = () => {
    if (onIconClick) {
      setOnIconClick(false).setLike(like - 1);
    } else {
      setOnIconClick(true).setLike(like + 1);
    }
  };

  const onchange = (e) => {
    setOnIconClick(e.target.value);
  };

  //TODO:하트클릭시 색 변하게 기능 추가/취소시 좋아요 개수 줄어들기

  return (
    <div type="button" className={styles.likeCount}>
      <button type="button" className={styles.icon}>
        <IconHeartFull
          type="Boolean"
          value
          className={styles.full}
          onClick={onClick}
          onChange={onchange}
        />
        <IconHeartEmpty className={styles.empty} />
      </button>
      <output className={styles.like}>좋아요 {like}개</output>
    </div>
  );
};

export default LikeButton;
