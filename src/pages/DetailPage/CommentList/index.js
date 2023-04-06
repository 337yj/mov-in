import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { getReviewsMovie } from "../../../api/Review";
import { Comment } from "../../index";

import styles from "./commentList.module.scss";
//TODO: 영화 리뷰 목록 조회
// export const getReviewsMovie = (movieId) => {
//   return apiClient.get(`/reviews/movie/${movieId}`);
// };

const CommentList = ({ movie }) => {
  const [comments, setComments] = useState();
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();


  // console.log(comments.comments[0].content);

  const onGetReviewsMovie = async () => {
    try {
      const response = await getReviewsMovie(id);
      if (response.status === 200) {
        setComments(response.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    onGetReviewsMovie();
  }, [id]);

  if (!comments) {
    return null;
  }

  return (
    <article className={styles.wrapper}>
      <h2>코멘트</h2>
      <p className={styles.commentOutput}>
        <ul>
          {comments.map((comment) => (
            <li key={comment.id}>
              <Comment comment={comment} />
            </li>
          ))}
        </ul>
      </p>
    </article>
  );
};

export default CommentList;
