import React, { useEffect, useState } from "react";
import { createMovieLike, deleteMovieLike } from "../../../../api/Movie";
import {
  createBookmarks,
  deleteBookmarks,
  getMyBookmarks,
} from "../../../../api/Bookmark";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userState } from "../../../../state";
import { commentModalState } from "../../../../state";
import { Button } from "../../../../components";
import {
  BsBookmark,
  BsBookmarkFill,
  BsFillHeartFill,
  BsHeart,
  BsPencil,
  BsStarFill,
} from "react-icons/bs";
import cx from "classnames";
import styles from "./movieInfo.module.scss";

const MovieInfo = ({ movie, toast }) => {
  const setModal = useSetRecoilState(commentModalState);
  const [showAllStaffs, setShowAllStaffs] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmark, setIsBookmark] = useState(false);
  const user = useRecoilValue(userState);

  const toggleModal = () => {
    setModal((prev) => !prev);
  };

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

  const checkIsLiked = async () => {
    if (user) {
      setIsLiked(movie.isLiked);
    } else {
      setIsLiked(false);
    }
  };

  const checkIsBookmarked = async () => {
    const response = await getMyBookmarks();
    const isBookmarked = response.data.some(
      (bookmark) => bookmark.movie.id === movie.id,
    );

    if (user && isBookmarked) {
      setIsBookmark(true);
    } else {
      setIsBookmark(false);
    }
  };

  const onClickNotUser = () => {
    if (!user) {
      toast("loginRequired");
    }
  };

  useEffect(() => {
    setIsLiked;
    setModal;
  }, []);

  const onClickLike = async () => {
    onClickNotUser();
    try {
      if (isLiked) {
        await deleteMovieLike(movie.id);
      } else {
        await createMovieLike(movie.id);
      }
      setIsLiked(!isLiked);
    } catch (error) {
      console.error(error);
    }
  };

  const onClickBookmark = async () => {
    onClickNotUser();
    try {
      if (isBookmark) {
        await deleteBookmarks(movie.id);
      } else {
        await createBookmarks(movie.id);
      }
      setIsBookmark(!isBookmark);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    checkIsLiked();
    checkIsBookmarked();
  }, [movie.id]);

  return (
    <section className={styles.wrapper}>
      <div className={styles.postWrapper}>
        <img
          className={styles.postImage}
          src={movie.postImage}
          alt="thumbnail"
        />
        <Button className={styles.likeBtn} color="dark" onClick={onClickLike}>
          {isLiked ? (
            <BsFillHeartFill className={styles.IconFillLike} />
          ) : (
            <BsHeart className={styles.IconLike} />
          )}
          좋아요
        </Button>
        <Button
          className={styles.bookmarkBtn}
          color="dark"
          onClick={onClickBookmark}
        >
          {isBookmark ? (
            <BsBookmarkFill className={styles.IconFillBookmark} />
          ) : (
            <BsBookmark className={styles.IconBookmark} />
          )}
          북마크
        </Button>
        <Button className={styles.ReviewBtn} color="dark" onClick={toggleModal}>
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
