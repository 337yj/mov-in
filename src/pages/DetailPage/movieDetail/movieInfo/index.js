import React from "react";
import { ImStarFull } from "react-icons/im";
import { IconBookmark, IconHeartEmpty, IconReview } from "../../../../assets";
import { Button } from "../../../../components";
import styles from "./movieInfo.module.scss";

const MovieInfo = ({ movie }) => {
  //NOTE: 일반 함수보다는 화살표 함수 사용
  const getStaffs = (staffs) => {
    const roleOrder = { 감독: 1, 각본: 2, 출연: 3 };
    return staffs
      .sort((a, b) => roleOrder[a.role] - roleOrder[b.role])
      .map((staff) => (
        <p className={styles.name}>
          {staff.name}
          <span className={styles.role}>{staff.role}</span>
        </p>
      ));
  };

  const getActors = (actors) => {
    return actors.map((actor) => (
      <p className={styles.name}>
        {actor.name}
        <span className={styles.role}>배우</span>
      </p>
    ));
  };

  return (
    <article className={styles.wrapper}>
      <div>
        <img
          className={styles.postImage}
          src={movie.postImage}
          alt="thumbnail"
        />
        <Button className={styles.likeBtn} color="dark">
          <div className={styles.icon}>
            <IconHeartEmpty />
          </div>
          좋아요
        </Button>
        <Button className={styles.bookmarkBtn} color="dark">
          <IconBookmark />
          북마크
        </Button>
        <Button className={styles.ReviewBtn} color="dark">
          <IconReview />
          코멘트
        </Button>
      </div>
      <div className={styles.infoWrapper}>
        <h2>
          평균평점
          <span className={styles.averageScore}>
            {/* <ImStarFull /> */}

            {movie?.averageScore ?? (
              <p className={styles.nullScore}>
                평가된 별점이 없습니다. 별점을 남겨주세요 !
              </p>
            )}
          </span>
        </h2>
        <h2>출연/제작</h2>
        <div className={styles.staffsWrapper}>
          {getStaffs(movie.staffs)}
          {getActors(movie.actors)}
        </div>
        <h2>줄거리</h2>
        <p className={styles.plot}>{movie.plot}</p>
      </div>
    </article>
  );
};

export default MovieInfo;
