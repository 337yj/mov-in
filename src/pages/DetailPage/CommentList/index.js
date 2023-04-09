import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getReviewsMovie } from "../../../api/Review";
import { useSetRecoilState } from "recoil";
import { commentIdState } from "../../../state";
import { Comment } from "../../index";
import styles from "./commentList.module.scss";

const CommentList = ({ movie, onChangeTab, onChangeSelectedCommentId }) => {
  const { id } = useParams();
  const [comments, setComments] = useState();
  const setCommentId = useSetRecoilState(commentIdState);

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

  const onClickMovie = (tap, id) => {
    onChangeTab(tap);
    // onChangeSelectedCommentId(id);
    setCommentId(id);
  };

  return (
    <article className={styles.wrapper}>
      <h2>코멘트</h2>
      <ul className={styles.commentList}>
        {comments.map((comment) => (
          <li key={comment.id} className={styles.comment}>
            <Comment
              comment={comment}
              onClick={() => onClickMovie("commentDetail", comment.id)}
            />
          </li>
        ))}
      </ul>
    </article>
  );
};

export default CommentList;
