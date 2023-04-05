import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";

import { getReviewsDetail } from "../../../../api/Review";

import { CommentHeader, CommentBody, CommentFooter } from "./Comment/_shared";
import { Reply } from "../../../../pages";
import { Button } from "../../../../components";

import styles from "./commentDetail.module.scss";

//TODO: 영화 리뷰 상세 조회
// export const getReviewsDetail = (id) => {
//   return apiClient.get(`/reviews/${id}/detail`);
// };

const CommentDetail = ({ profileImage, username, ...props }) => {
  const [commentDetail, setCommentDetail] = useState();
  const { id } = useParams();

  const onGetReviewsDetail = async () => {
    try {
      const response = await getReviewsDetail(id);
      if (response.status === 200) {
        setCommentDetail(response.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    onGetReviewsDetail();
  }, [id]);

  if (!commentDetail) {
    return null;
  }

  return (
    <article>
      <h2>코멘트</h2>
      <section className={styles.wrapper}>
        <div className={styles.myComment}>
          <CommentHeader movie={movie} />
          <hr className={styles.horizontalLine}></hr>
          <CommentBody movie={movie} />
          <hr className={styles.horizontalLine}></hr>
          <CommentFooter
            movie={movie}
            className={styles.comment}
            date={dayjs().format("YYYY.MM.DD")}
          />
        </div>
        {/* <hr className={styles.horizontalLine}></hr> */}
        <div className={styles.replyInput}>
          <figure className={styles.profile}>
            <img src={profileImage} alt="" className={styles.profileImage} />
            <figcaption className={styles.username}>{username}</figcaption>
          </figure>
          <Button className={styles.primary} />
          <input></input>
        </div>
        {/* <hr className={styles.horizontalLine}></hr> */}
        <ul className={styles.replyList}>
          {comment.map((movie) => (
            <li>
              <Reply movie={movie} />
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
};

export default CommentDetail;
