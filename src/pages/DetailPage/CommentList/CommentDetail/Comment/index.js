import React from "react";
import dayjs from "dayjs";

import { CommentHeader, CommentBody, CommentFooter } from "./_shared";

import styles from "./comment.module.scss";
import { ImageProfile1 } from "../../../../../assets";
import { getReviewsMovie } from "../../../../../api/Review";
import { useParams } from "react-router-dom";
import { BsStarFill } from "react-icons/bs";

// props type 작성
//TODO: 영화 리뷰 목록 조회
// export const getReviewsMovie = (movieId) => {
//   return apiClient.get(`/reviews/movie/${movieId}`);
// };

const Comment = ({ comment, profileImage, className, ...props }) => {
  if (!comment) {
    return null;
  }
  return (
    <section className={styles.wrapper} onClick={props.onClick}>
      <CommentHeader profileImage={ImageProfile1} comment={comment}>
        <p className={styles.userScore}>
          평점
          <BsStarFill className={styles.star} />
          <span>{comment.score.toFixed(1)}</span>
        </p>
      </CommentHeader>
      <CommentBody className={styles.content} comment={comment} />
      <CommentFooter className={styles.comment} comment={comment} />
    </section>
  );
};

export default Comment;
