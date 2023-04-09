import React from "react";
import { CommentHeader, CommentBody, CommentFooter } from "./_shared";
import { ImageProfile1 } from "../../../../../assets";
import { BsStarFill } from "react-icons/bs";
import styles from "./comment.module.scss";
import { useRecoilValue } from "recoil";
import { commentsState } from "../../../../../state";

const Comment = ({ comment, profileImage, className, ...props }) => {
  const comments = useRecoilValue(commentsState);
  console.log(comments);
  const enjoyPoints = comments.enjoyPoints ? comments.enjoyPoints : [];
  const tensions = comments.tensions ? comments.tensions : [];

  if (!comment) {
    return null;
  }

  return (
    <section className={styles.wrapper} onClick={props.onClick}>
      <CommentHeader profileImage={ImageProfile1} comment={comment}>
        <p>{enjoyPoints?.join(", ")}</p>
        <p>{tensions?.join(", ")}</p>
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
