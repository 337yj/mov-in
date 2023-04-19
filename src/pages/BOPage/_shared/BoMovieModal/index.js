import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getMovie, updateMovie } from "../../../../api/Movie";

import { Modal, Button } from "../../../../components";

import styles from "./boMovieModal.module.scss";
import { BsFillHeartFill, BsStarFill } from "react-icons/bs";

const BoMovieModal = ({ movieId, modal, onCloseModal }) => {
  //NOTE: id가 필요하지 않습니다.
  // const { id } = useParams();

  const [movie, setMovie] = useState(null);

  const onClickModal = () => {
    onCloseModal();
    setMovie(null);
  };

  const onClickModify = async () => {};

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
      staffs: [role === "감독"],
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

  console.log({ movieId, movie });
  useEffect(() => {
    onGetMovieDetail();
  }, [movieId]);

  if (!movie) {
    return null;
  }

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
              <Button className={styles.likeButton} color={"dark"}>
                <BsFillHeartFill />
                {movie.likeCount}
              </Button>
              <Button className={styles.views} color="dark">
                {movie.reviewCount}
              </Button>
              <Button className={styles.averageScore} color={"dark"}>
                <h2>평균평점</h2>{" "}
                {movie.averageScore ? (
                  <span className={styles.averageScore}>
                    <BsStarFill className={styles.IconStar} />
                    {movie.averageScore.toFixed(1)}
                  </span>
                ) : null}
              </Button>
              <p className={styles.plot}>{movie.plot}</p>
            </div>
          </section>
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
              onClick={() => setModal((prev) => !prev)}
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
