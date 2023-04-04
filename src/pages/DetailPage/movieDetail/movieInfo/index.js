import React, { useState } from "react";
import { Button, Modal, Stars } from "../../../../components";
import { BsBookmark, BsHeart, BsPencil, BsStarFill } from "react-icons/bs";
import styles from "./movieInfo.module.scss";
import cx from "classnames";
import CommentModal from "../_shared/CommentModal";

const MovieInfo = ({ movie }) => {
  const [showAllStaffs, setShowAllStaffs] = useState(false);
  const [modal, setModal] = useState(false);
  const [rating, setRating] = useState(null);

  const getStaffs = (staffs) => {
    const roleOrder = { 감독: 1, 각본: 2 };
    const filteredStaffs = staffs.filter((staff) => staff.role !== "출연");
    return filteredStaffs
      .sort((a, b) => roleOrder[a.role] - roleOrder[b.role])
      .map((staff) => (
        <p className={styles.name} key={staff.id}>
          {staff.name}
          <span className={styles.role}>{staff.role}</span>
        </p>
      ));
  };

  const getActors = (actors) => {
    return actors.map((actor) => (
      <p className={styles.name} key={actor.id}>
        {actor.name}
        <span className={styles.role}>배우</span>
      </p>
    ));
  };

  const onClickModal = () => {
    setModal(!modal);
  };

  const onRatingChange = (newRating) => {
    setRating(newRating);
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
        <Button
          className={styles.ReviewBtn}
          color="dark"
          onClick={onClickModal}
        >
          <BsPencil className={styles.IconReview} />
          코멘트
        </Button>
        <CommentModal
          movie={movie}
          title={movie.title}
          modal={modal}
          rating={rating}
          setModal={setModal}
          setRating={setRating}
          onRatingChange={onRatingChange}
        />
        {/* {modal && (
          <Modal
            className={styles.modal}
            title={movie.title}
            onClick={onClickModal}
          >
            <p>영화를 평가해주세요.</p>
            <Stars rating={rating} onRatingChange={onRatingChange} />
            <p>
              어떤 점이 좋았나요?
              <br />
              감상 포인트를 추천해 주세요!
            </p>
          </Modal>
        )} */}
      </div>
      <div className={styles.infoWrapper}>
        <div className={styles.scoreWrapper}>
          <h2>평균평점</h2>
          {movie.averageScore ? (
            <span className={styles.averageScore}>
              {<BsStarFill className={styles.IconStar} />}
              {movie.averageScore.toFixed(1)}
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
