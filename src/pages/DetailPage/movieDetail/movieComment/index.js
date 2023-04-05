import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getReviewsMovie } from "../../../../api/Review";
import Comment from "../../CommentList/CommentDetail/Comment";
// import CommentOutput from "../movieComment";
import styles from "./movieComment.module.scss";

const MovieComment = ({ movie, onChangeTab }) => {
  const { id } = useParams();
  const [review, setReview] = useState();

  console.log(review);

  const onClickMovie = (type) => {
    if (type === "commentDetail") {
      onChangeTab("commentDetail");
    } else if (type === "commentList") {
      onChangeTab("commentList");
    }
  };

  const onGetMovieReview = async () => {
    try {
      const response = await getReviewsMovie(id);
      if (response.status === 200) {
        setReview(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    onGetMovieReview();
  }, [id]);

  if (!movie) {
    return null;
  }

  return (
    <section className={styles.wrapper}>
      <h2>코멘트</h2>
      <Comment onClick={() => onClickMovie("commentDetail")} />
      <div className={styles.btnWrapper}>
        <button
          className={styles.moreBtn}
          onClick={() => onClickMovie("commentList")}
        >
          더보기
        </button>
      </div>
    </section>
  );
};

export default MovieComment;
