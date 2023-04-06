import React, { useState } from "react";

import { BsFillHeartFill, BsHeart } from "react-icons/bs";

import styles from "./likeCount.module.scss";

//TODO:하트클릭시 색 변하게 기능 추가/취소시 좋아요 개수 줄어들기
//TODO: 리뷰 좋아요
// export const createReviewsLike = (id) => {
//   return apiClient.post(`/reviews/${id}/like`);
// };
//TODO: 리뷰 좋아요 삭제
// export const deleteReviewsLike = (id) => {
//   return apiClient.delete(`/reviews/${id}/like`);
// };

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

  return (
    <div type="button" className={styles.likeCount}>
      <button type="button" className={styles.icon}>
        <BsFillHeartFill
          type="Boolean"
          value
          className={styles.full}
          onClick={onClick}
          onChange={onchange}
        />
        <BsHeart className={styles.empty} />
      </button>
      <output className={styles.like}>좋아요 {like}개</output>
    </div>
  );
};

export default LikeButton;
