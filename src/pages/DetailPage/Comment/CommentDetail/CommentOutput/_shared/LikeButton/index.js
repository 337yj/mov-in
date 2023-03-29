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
    // 클릭 취소시 개수 줄어드는 기능 추가
  };

  const onchange = (e) => {
    setOnIconClick(e.target.value);
  };

  //false 빈하트 true일때 꽉찬하트
  // 이 결과 값에 따라 false -1 true +1

  return (
    <button type="button" className={styles.likeCount}>
      {/* // 하트 클릭시 색 변하게 기능 추가 */}
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
    </button>
  );
};

export default LikeButton;
