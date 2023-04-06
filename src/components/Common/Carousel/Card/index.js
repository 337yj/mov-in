import React from "react";
import { useNavigate } from "react-router-dom";
import Tag from "../../Tag";
import noPoster from "../../../../assets/images/poster/noPoster.png"
import dayjs from "dayjs";
import cx from "classnames";
import styles from "./subCard.module.scss";

const SubCard = ({ movie, className }) => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate(`/detail/${movie.id}`);
  };

  return (
    <section className={styles.wrapper} onClick={onClick}>
      {movie.postImage ? (
        <img
          src={movie.postImage}
          alt="thumbnail"
          className={cx(styles.img, className)}
        />
      ) : (
        <img src={noPoster} className={cx(styles.img, styles.shadow)}/>
      )}
        <article className={styles.info}>
          <div className={styles.padding}>
            <div className={styles.title}>
              <h3>{movie.title}</h3>
              <div className={styles.date}>
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
            <p className={styles.plot}>{movie.plot}</p>
          </div>
        </article>
    </section>
  );
};
export default SubCard;
