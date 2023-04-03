import React, { useEffect, useState } from "react";
import styles from "./commentList.module.scss";
import { Comment } from "../../index";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import CommentOutput from "./CommentDetail/Comment";

const CommentList = ({ movie }) => {
  const [comment, setComment] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [review, setReview] = useState();
  const { id } = useParams();

  console.log(review);
  const onGetMovieReview = async () => {
    try {
      const response = await getReviewsMovie(id);
      if (response.status === 200) {
        setReview(response.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    onGetMovieReview();
  }, [id]);

  if (!review) {
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
              <CommentOutput movie={movie} />
            </li>
          ))}
        </ul>
      </p>
    </article>
  );
};

export default CommentList;
