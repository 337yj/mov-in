import React from "react";
import { Tag } from "../../../components";
import styles from "./card.module.scss";

const Poster = ({ movie }) => {
  return (
    <section className={styles.wrapper}>
      <img src={movie.image} alt="thumbnail"/>
      <article className={styles.info}>
        <div className={styles.title}>
          <h3>영화 제목을 길게 쓰면 말줄임 처리</h3>
          <div className={styles.detail}>
            <p>15</p>
            <p>2시간 27분</p>
          </div>
        </div>
        <div className={styles.tags}>
          <Tag type="selectTag">태그1</Tag>
          <Tag type="selectTag">태그2</Tag>
        </div>
        <p>낮에는 자동차 정비 일과 영화 촬영장에서 자동차 스턴트 일을 하고, 밤에는 범죄자들의 도주를 도와주는 주인공 '드라이버(라이언 고슬링)가 이웃집 여인 아이린(캐리 멀리건)과 친해지게 되는데</p>
      </article>
    </section>
  );
};
export default Poster;
