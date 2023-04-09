import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { getReviewsMovie } from "../../../../api/Review";
import { commentsState } from "../../../../state";
import Comment from "../../CommentList/CommentDetail/Comment";
import styles from "./movieComment.module.scss";

const MovieComment = ({ onChangeTab }) => {
  const { id } = useParams();
  // const [comments, setComments] = useState([]);
  const [comments, setComments] = useRecoilState(commentsState);

  const onClickMovie = (type, commentId) => {
    if (type === "commentDetail") {
      onChangeTab("commentDetail", commentId);
    } else if (type === "commentList") {
      onChangeTab("commentList");
    }
  };

  const onGetMovieReview = async () => {
    try {
      const response = await getReviewsMovie(id);
      if (response.status === 200) {
        const data = response.data;
        setComments(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    onGetMovieReview();
  }, [id]);

  return (
    <section className={styles.wrapper}>
      <h2>코멘트</h2>
      <ul className={styles.commentWrapper}>
        {comments.slice(0, 2).map((comment) => (
          <li key={comment.id}>
            <Comment
              comment={comment}
              onClick={() => onClickMovie("commentDetail", comment.id)}
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
