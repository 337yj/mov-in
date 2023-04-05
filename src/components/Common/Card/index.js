import React from "react";
import { useNavigate } from "react-router-dom";
import Tag from "../Tag";
import { BsStarFill } from "react-icons/bs";
import dayjs from "dayjs";
import cx from "classnames";
import styles from "./card.module.scss";

const Card = ({ movie, type = "default", className }) => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate(`/detail/${movie.id}`);
  };

  return (
    <section className={cx(styles.wrapper, styles[type])} onClick={onClick}>
      <img
        src={movie.postImage}
        alt="thumbnail"
        className={cx(styles.img, className)}
      />
      {type === "default" && (
        <div className={styles.infoWrapper}>
          <h2 className={styles.title}>{movie.title}</h2>
          {movie.averageScore ? (
            <span className={styles.score}>
              {<BsStarFill className={styles.star} />}
              {movie.averageScore.toFixed(1)}
            </span>
          ) : (
            <p className={styles.nullScore}>평가된 별점이 없습니다.</p>
          )}
        </div>
      )}
      {type === "carousel" && (
        <article className={styles.info}>
          <div className={styles.padding}>
            {/* article에서 바로 padding 넣으니까 정보가 완전히 안 가려져서 따로 만듦 */}
            <div className={styles.title}>
              <h3>{movie.title}</h3>
              <div className={styles.detail}>
                {/* <p>15</p> */}
                <p>
                  {dayjs(movie.releasedAt, "YYYYMMDD").format("YYYY.MM.DD")}
                </p>
              </div>
            </div>
            <div className={styles.tags}>
              <Tag 
                text={movie.genres.map((genre) => genre.name).join(", ")}
              ></Tag>
            </div>
            <p>{movie.plot}</p>
          </div>
        </article>
      )}
    </section>
  );
};
export default Card;
