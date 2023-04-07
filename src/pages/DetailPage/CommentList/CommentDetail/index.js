import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getReviewsDetail, getReviewsMovie } from "../../../../api/Review";
import { CommentHeader, CommentBody, CommentFooter } from "./Comment/_shared";
import { Reply } from "../../../../pages";
import { Button } from "../../../../components";

import styles from "./commentDetail.module.scss";

const CommentDetail = ({
  profileImage,
  comment,
  username,
  movie,
  onChangeTab,
  selectedCommentId,
  ...props
}) => {
  const [detailComment, setDetailComment] = useState();
  // const { id } = useParams();

  if (!selectedCommentId) {
    return null;
  }

  const onGetReviewsDetail = async () => {
    try {
      const response = await getReviewsDetail(selectedCommentId);
      if (response.status === 200) {
        setDetailComment(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    onGetReviewsDetail();
  }, [selectedCommentId]);

  // console.log(selectedCommentId);
  // console.log(detailComment);

  return (
    <article className={styles.wrapper}>
      <div className={styles.innerWrapper}>
        <h2>코멘트</h2>
        <section className={styles.selectedComment}>
          <div>유저 닉넴, 리뷰포인트</div>
          <p>{detailComment.content}</p>
          <CommentBody comment={detailComment} />
          <CommentFooter comment={detailComment} />
        </section>
        <section></section>
      </div>
    </article>
  );
};

export default CommentDetail;
