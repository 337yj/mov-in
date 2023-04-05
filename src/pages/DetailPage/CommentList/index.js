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
  const [comment, setComment] = useState();
  const { id } = useParams();

  console.log(comment);
  const onGetReviewsMovie = async () => {
    try {
      const response = await getReviewsMovie(id);
      if (response.status === 200) {
        setComment(response.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    onGetReviewsMovie();
  }, [id]);

  if (!comment) {
    return null;
  }

  const navigate = useNavigate();
  const location = useLocation();

  return (
    <article className={styles.wrapper}>
      <h2>코멘트</h2>
      <p className={styles.commentOutput}>
        <ul>
          {review.map((movie) => (
            <li key={movie.id}>
              <Comment movie={movie} />
            </li>
          ))}
        </ul>
      </p>
    </article>
  );
};

export default CommentList;
