import React from "react";
import { useNavigate } from "react-router-dom";
import noPoster from "../../../../assets/images/poster/noPoster.png";
import { BsStarFill } from "react-icons/bs";
import styles from "./myCard.module.scss";
import cx from "classnames";

//NOTE: movie가 아니라 review => key값이 다릅니다.
const MyCard = ({ movie }) => {
  console.log({ movie });
  const navigate = useNavigate();

  const onClick = () => {
    navigate(`/detail/${movie.id}`);
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
        <h2 className={styles.title}>{movie.title}</h2>
        <div>
          {movie.movie.averageScore ? (
            <span className={styles.score}>
              {<BsStarFill className={styles.star} />}
              {/* {movie.averageScore.toFixed(1)} */}
            </span>
          ) : (
            // 에러 -> 목록 확인 불가로 평균 평점 임시로 띄움
            <p className={styles.nullScore}>평가된 별점이 없습니다.</p>
          )}
          <span className={styles.myScore}>
            {<BsStarFill className={styles.star} />}
            {/* {movie.score.toFixed(1)} */}
          </span>
        </div>
      </div>
    </section>
  );
};

export default MyCard;
