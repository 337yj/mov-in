import React, { useState } from "react";
import { Button } from "../../../../components";
import { BsBookmark, BsHeart, BsPencil, BsStarFill } from "react-icons/bs";
import styles from "./movieInfo.module.scss";
import cx from "classnames";

const MovieInfo = ({ movie }) => {
  const [showAllStaffs, setShowAllStaffs] = useState(false);

  const getStaffs = (staffs) => {
    const roleOrder = { 감독: 1, 각본: 2 };
    const filteredStaffs = staffs.filter((staff) => staff.role !== "출연");
    return filteredStaffs
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
    <section className={styles.wrapper}>
      <div className={styles.postWrapper}>
        <img
          className={styles.postImage}
          src={movie.postImage}
          alt="thumbnail"
        />
        <Button className={styles.likeBtn} color="dark">
          <BsHeart className={styles.IconLike} />
          좋아요
        </Button>
        <Button className={styles.bookmarkBtn} color="dark">
          <BsBookmark className={styles.IconBookmark} />
          북마크
        </Button>
        <Button className={styles.ReviewBtn} color="dark">
          <BsPencil className={styles.IconReview} />
          코멘트
        </Button>
      </div>
      <div className={styles.infoWrapper}>
        <div className={styles.scoreWrapper}>
          <h2>평균평점</h2>
          {movie.averageScore ? (
            <span className={styles.averageScore}>
              {<BsStarFill className={styles.IconStar} />}
              {movie.averageScore}
            </span>
          ) : (
            <p className={styles.nullScore}>
              별점이 존재하지 않아, 더욱 기대가 되는군요 !
            </p>
          )}
        </div>
        <h2>출연/제작</h2>
        <div
          className={cx(styles.staffsWrapper, {
            [styles.showAllStaffs]: showAllStaffs,
          })}
        >
          {getStaffs(movie.staffs)}
          {getActors(movie.actors)}
        </div>
        <div className={styles.btnWrapper}>
          {movie.staffs.length > 20 && (
            <button
              className={styles.moreStaffsBtn}
              onClick={() => setShowAllStaffs(!showAllStaffs)}
            >
              {showAllStaffs ? "접기" : "더보기"}
            </button>
          )}
        </div>
        <h2>줄거리</h2>
        <p className={styles.plot}>{movie.plot}</p>
      </div>
    </section>
  );
};

export default MovieInfo;
