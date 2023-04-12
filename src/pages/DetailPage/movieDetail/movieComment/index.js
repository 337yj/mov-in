import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { getMovieMyReview, getReviewsMovie } from "../../../../api/Review";
import { myCommentState, userState } from "../../../../state";
import Comment from "../../CommentList/Comment";

import styles from "./movieComment.module.scss";

const MovieComment = ({ movie }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const [myComment, setMyComment] = useRecoilState(myCommentState);
  const user = useRecoilValue(userState);

  const onClickNavigate = (path) => {
    return () => {
      navigate(path);
    };
  };

  const onGetMovieReview = async () => {
    try {
      const response = await getReviewsMovie(id);
      if (response.status === 200) {
        const data = response.data;
        setComments(data);
        const myComment = data.find((review) => review?.user?.id === user?.id);
        setMyComment(myComment);
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
      <div className={styles.myComment}>
        <Comment
          comment={myComment}
          onClick={onClickNavigate(`/commentDetail/${myComment?.id}`)}
        />
      </div>
      <ul className={styles.commentWrapper}>
        {comments
          .filter((comment) => comment?.user?.id !== user?.id)
          .slice(0, 2)
          .map((comment) => (
            <li key={comment?.id}>
              <Comment comment={comment} />
            </li>
          ))}
      </ul>
      <div className={styles.btnWrapper}>
        <button
          className={styles.moreBtn}
          onClick={onClickNavigate(`/commentList/${id}`)}
        >
          더보기
        </button>
      </div>
    </section>
  );
};

export default MovieComment;
