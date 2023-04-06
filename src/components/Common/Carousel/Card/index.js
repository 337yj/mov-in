import React from "react";
import { useNavigate } from "react-router-dom";
import Tag from "../../Tag";
import dayjs from "dayjs";
import cx from "classnames";
import styles from "./card.module.scss";

const Card = ({ movie, className }) => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate(`/detail/${movie.id}`);
  };

  return (
    <section className={cx(styles.wrapper)} onClick={onClick}>
      <img
        src={movie.postImage}
        alt="thumbnail"
        className={cx(styles.img, className)}
      />
        <article className={styles.info}>
          <div className={styles.padding}>
            <div className={styles.title}>
              <h3>{movie.title}</h3>
              <div className={styles.detail}>
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
    </section>
  );
};
export default Card;
