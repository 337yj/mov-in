import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getReviewsMovie } from "../../../../api/Review";
import Comment from "../../CommentList/CommentDetail/Comment";
import CommentOutput from "../../CommentList/CommentDetail/Comment";
// import CommentOutput from "../movieComment";
import styles from "./movieComment.module.scss";

const MovieComment = ({ movie, onChangeTab }) => {
  const { id } = useParams();
  const [comments, setComments] = useState([]);

  console.log(comments);

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
        setComments(response.data);
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
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            <Comment
              comment={comment}
              onClick={() => onClickMovie("commentDetail")}
            />
          </li>
        ))}
      </ul>
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
