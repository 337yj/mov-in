import React from "react";
import { useNavigate } from "react-router-dom";
import noPoster from "../../../assets/images/poster/noPoster.png";
import { BsStarFill } from "react-icons/bs";
import styles from "./userCard.module.scss";
import cx from "classnames";

const UserCard = ({ review }) => {
  const navigate = useNavigate();
  console.log({ review });


  const onClick = () => {
    navigate(`/commentDetail/${review.user.id}`);
  };

  return (
    <section className={styles.wrapper} onClick={onClick}>
      {review.postImage ? (
        <img
          src={review.postImage}
          alt="thumbnail"
          className={cx(styles.img)}
        />
      ) : (
        <img src={noPoster} className={cx(styles.img, styles.shadow)} />
      )}
      <div className={styles.infoWrapper}>
        <h2 className={styles.title}>{movie?.movie.title}</h2>
        <div>
          <span className={styles.score}>
            <p>전체</p> 
            <BsStarFill className={styles.star} />
            {review.movie.averageScore?.toFixed(1)}
          </span>
          <span className={styles.myScore}>
          <p>평가</p> 
            <BsStarFill className={styles.star} />
            {review.score?.toFixed(1)}
          </span>
        </div>
      </div>
    </section>
  );
};

export default UserCard;