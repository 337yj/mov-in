import React, { useState } from "react";
import { IconHeartEmpty, IconHeartFull } from "../../../../../../assets/icon";

import styles from "./likeCount.module.scss";

const LikeCount = () => {
  const [like, setLike] = useState(0);
  const [onIconClick, setOnIconClick] = useState(false);

  const onClick = () => {
    setLike(like + 1);
    // 클릭 취소시 개수 줄어드는 기능 추가
  };

  //false 빈하트 true일때 꽉찬하트
  // 이 결과 값에 따라 false -1 true +1

  const IconClick = () => {
    if (onIconClick) {
      setOnIconClick(false);
    } else {
      setOnIconClick(true);
    }
  };

  return (
    <div className={styles.likeCount} onClick={onClick}>
      {/* // 하트 클릭시 색 변하게 기능 추가 */}
      <button className={styles.icon}>
        <IconHeartFull className={styles.full} onChange={IconClick} />
        <IconHeartEmpty className={styles.Empty} />
      </button>
      <output className={styles.like}>좋아요 {like}개</output>
    </div>
  );
};

export default LikeCount;
