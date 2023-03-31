import React, { useEffect, useState } from "react";
import styles from "./comment.module.scss";
import { CommentOutput } from "../../index";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const Comment = ({ 영화제목 }) => {
  const { "/comment/": id } = useParams();
  const [comment, setComment] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);

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
      <h4>코멘트</h4>
      <p className={styles.commentOutput}>
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
