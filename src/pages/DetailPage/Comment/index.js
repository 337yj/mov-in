import React, { useEffect, useState } from "react";
import styles from "./comment.module.scss";
import { CommentOutput } from "../../index";
import { useLocation, useNavigate, useParams } from "react-router-dom";

// 윤 - Comment -> CommentList
const Comment = ({ 영화제목 }) => {
  // const { "/comment/": id } = useParams();
  const [comment, setComment] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [review, setReview] = useState();

  const { id } = useParams();
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

  const navigate = useNavigate();
  const location = useLocation();

  const [show, setShow] = useState(false);

  const runtimeInMinutes = movie?.runtime || 0;
  const hours = Math.floor(runtimeInMinutes / 60);
  const minutes = runtimeInMinutes % 60;
  const formattedRuntime = `${hours}시간 ${minutes}분`;

  useEffect(() => {
    const getComment = async () => {
      const { data } = await axios.get(`/reviews/movie/${movieId}`);
      return data;
    };
    getComment()
      .then((result) => setComment(result))
      .then(() => setIsLoaded(true));
  }, []);

  return (
    // <React.Fragment>
    //   {isLoaded && (
    <article className={styles.wrapper}>
      {/* 윤 - h4 -> h2로 변경 */}
      <h4>코멘트</h4>
      <p className={styles.commentOutput}>
        <ul>
          {review.map((movie) => (
            <li key={movie.id}>
              <CommentOutput movie={movie} />
            </li>
          ))}
        </ul>

        <CommentOutput />
        <CommentOutput />
        <CommentOutput />
        <CommentOutput />
        <CommentOutput />
        <CommentOutput />
        <CommentOutput />
        <CommentOutput />
      </p>
    </article>
    // )}
    // </React.Fragment>
  );
};

export default Comment;
