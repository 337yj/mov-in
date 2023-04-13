import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getMovie } from "../../../../api/Movie";

import { Modal, Button } from "../../../../components";

import styles from "./boMovieModal.module.scss";
import { BsFillHeartFill } from "react-icons/bs";

const BoMovieModal = ({ movie, modal, onCloseModal }) => {
  const { id } = useParams();

  const [movies, setMovies] = useState([]);

  const onClickModal = () => {
    onCloseModal();
  };

  const onGetMovieDetail = async () => {
    try {
      const response = await getMovie(id);
      if (response.status === 200) {
        setMovies(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    onGetMovieDetail(movie);
  }, [id]);

  console.log({ modal, movie });
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
              {/* <Button
                className={styles.views}
                color="dark"
              ></Button> */}
              <Button className={styles.averageScore} color={"dark"}>
                <h2>평균평점</h2>{" "}
                {movie.averageScore ? (
                  <span className={styles.averageScore}>
                    {<BsStarFill className={styles.IconStar} />}
                    {movie.averageScore.toFixed(1)}
                  </span>
                ) : null}
              </Button>
              <p className={styles.plot}>{movie.plot}</p>
            </div>
          </section>
          <div className={styles.buttonWrapper}>
            <Button className={styles.modify} color={"primary"}>
              수정
            </Button>
            <Button className={styles.cancel} color={"secondary"}>
              취소
            </Button>
          </div>
        </form>
      </Modal>
    )
  );
};

export default BoMovieModal;
