import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BsFillHeartFill, BsStarFill } from "react-icons/bs";
import dayjs from "dayjs";

import { getMovie, updateMovie } from "../../../../api/Movie";

import { Modal, Button } from "../../../../components";

import styles from "./boMovieModal.module.scss";

const BoMovieModal = ({ movieId, modal, onCloseModal }) => {
  const [movie, setMovie] = useState(null);

  const onClickModal = () => {
    onCloseModal();
    setMovie(null);
  };

  const onChange = (e) => {
    const { value } = e.currentTarget;
    setMovie(value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const movieData = {
      title,
      plot,
      score: rating,
      runtime,
      genres,
      releasedAtm,
    };
    await updateMovie(movieId, movieData);
    alert("수정되었습니다.");
    onGetMovieDetail();
    await onGetMovieDetail();
    setModal((prev) => !prev);
  };

  const onGetMovieDetail = async () => {
    try {
      const response = await getMovie(movieId);
      if (response.status === 200) {
        setMovie(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  //console.log({ movieId, movie });

  useEffect(() => {
    onGetMovieDetail();
  }, [movieId]);

  if (!movie) {
    return null;
  }

  //NOTE: 모달 내의 텍스트는 전체적으로 크기가 좀 커져야할 것 같습니다.

  return (
    modal && (
      <Modal
        className={styles.boMovieModal}
        movie={movie}
        title={"영화 관리"}
        onClick={onClickModal}
      >
        <form className={styles.wrapper}>
          <section className={styles.postWrapper}>
            <img
              className={styles.postImage}
              src={movie.postImage}
              alt="thumbnail"
            />
            <div className={styles.content}>
              <p className={styles.movieTitle}>{movie.title}</p>
              <div className={styles.contentInfo}>
                <p>{movie.runtime}분 |</p>
                <p>{movie.genres.map((genre) => genre?.name).join(", ")} |</p>
                <p>
                  {dayjs(movie.releasedAt, "YYYYMMDD").format("YYYY.MM.DD")}
                </p>
              </div>
              <div className={styles.likeButton} color={"dark"}>
                <BsFillHeartFill className={styles.IconHeart} />
                {movie.likeCount}
              </div>
              <div className={styles.views} color="dark">
                {movie.reviewCount}
              </div>
              <div className={styles.averageScore} color={"dark"}>
                <h2>평균평점</h2>{" "}
                {movie.averageScore ? (
                  <span className={styles.averageScore}>
                    <BsStarFill className={styles.IconStar} />
                    {movie.averageScore.toFixed(1)}
                  </span>
                ) : null}
              </div>{" "}
              <p className={styles.plot}>{movie.plot}</p>
            </div>
          </section>{" "}
          <div className={styles.buttonWrapper}>
            <Button
              className={styles.modify}
              color={"primary"}
              onClick={onSubmit}
            >
              수정
            </Button>
            <Button
              className={styles.cancel}
              color={"secondary"}
              onClick={onClickModal}
            >
              취소
            </Button>
          </div>
        </form>
      </Modal>
    )
  );
};
export default BoMovieModal;
