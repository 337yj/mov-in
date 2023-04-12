import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./commentList.module.scss";
import Comment from "./Comment";
import { getReviewsMovie } from "../../../api/Review";

const CommentList = ({ movie, onChangeTab, onChangeSelectedCommentId }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [comments, setComments] = useState();
  console.log(comments);
  const onGetReviewsMovie = async () => {
    try {
      const response = await getReviewsMovie(id);
      if (response.status === 200) {
        setComments(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    onGetReviewsMovie();
  }, [id]);

  if (!comments) {
    return null;
  }

  const onClickNavigate = (path) => {
    return () => {
      navigate(path);
    };
  };
  return (
    <article className={styles.wrapper}>
      <h2>코멘트</h2>
      <ul className={styles.commentList}>
        {comments.map((comment) => (
          <li key={comment.id} className={styles.comment}>
            <Comment
              comment={comment}
              onClick={onClickNavigate(`/commentDetail/${comment.id}`)}
            />
          </li>
        ))}
      </ul>
    </article>
  );
};

export default CommentList;
