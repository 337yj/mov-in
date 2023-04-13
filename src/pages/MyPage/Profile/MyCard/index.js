import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import noPoster from "../../../../assets/images/poster/noPoster.png";
import { BsStarFill } from "react-icons/bs";
import styles from "./myCard.module.scss";
import cx from "classnames";

//NOTE: movie가 아니라 review => key값이 다릅니다.
const MyCard = ({ movie }) => {
  console.log({ movie });
  const navigate = useNavigate();
  //const location = useLocation();


  const onClick = () => {
    navigate(`/commentDetail/${movie.id}`);
  };

  return (
    <section className={styles.wrapper} onClick={onClick}>
      {movie.movie.postImage ? (
        <img
          src={movie.movie.postImage}
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
            {movie.movie.averageScore?.toFixed(1)}
          </span>
          <span className={styles.myScore}>
          <p>평가</p> 
            <BsStarFill className={styles.star} />
            {movie.score?.toFixed(1)}
          </span>
        </div>
      </div>
    </section>
  );
};

export default MyCard;