import React from "react";
import { useNavigate } from "react-router-dom";
import Tag from "../Tag";
import { BsStarFill } from "react-icons/bs";
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
              {movie.averageScore}
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
                <p>15</p>
                <p>2시간 27분</p>
              </div>
            </div>
            <div className={styles.tags}>
              <Tag type="selectTag">태그1</Tag>
              <Tag type="selectTag">태그2</Tag>
            </div>
            <p>
              낮에는 자동차 정비 일과 영화 촬영장에서 자동차 스턴트 일을 하고,
              밤에는 범죄자들의 도주를 도와주는 주인공 '드라이버(라이언
              고슬링)가 이웃집 여인 아이린(캐리 멀리건)과 친해지게 되는데
            </p>
          </div>
        </article>
      )}
    </section>
  );
};
export default Card;
