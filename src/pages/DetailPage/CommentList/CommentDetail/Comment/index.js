import React from "react";
import dayjs from "dayjs";

import { CommentHeader, CommentBody, CommentFooter } from "./_shared";

import styles from "./comment.module.scss";
import { ImageProfile1 } from "../../../../../assets";
import { getReviewsMovie } from "../../../../../api/Review";
import { useParams } from "react-router-dom";

// props type 작성
//TODO: 영화 리뷰 목록 조회
// export const getReviewsMovie = (movieId) => {
//   return apiClient.get(`/reviews/movie/${movieId}`);
// };

const Comment = ({
  comment,
  profileImage,
  username,
  grade,
  date,
  className,

  ...props
}) => {
  return (
    <section className={styles.wrapper} onClick={props.onClick}>
      <CommentHeader
        className={styles.grade}
        profileImage={ImageProfile1}
        comment={comment}
      />
      <CommentBody className={styles.content} comment={comment} />
    </section>
  );
};

export default Comment;
{
  /* <section className={styles.wrapper} onClick={props.onClick}>
      <CommentHeader
        className={styles.grade}
        profileImage={ImageProfile1}
        username={"닉네임"}
        grade={4.0}
      />

      <CommentBody className={styles.content} comment={comment} />

      <CommentFooter
        className={styles.comment}
        date={dayjs().format("YYYY.MM.DD")}
        comment={comment}
      />
    </section> */
}
