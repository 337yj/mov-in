import React, { useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getMovie } from "../../api/Movie";
import { MovieComment, MovieInfo, RelatedMovie } from "./movieDetail";
import { useRecoilState } from "recoil";
import { toastFloatState, toastMsgState } from "../../state";
import { Toast } from "../../components";
import dayjs from "dayjs";
import { formatRuntime } from "./_shared/formatRuntime";
import { msgList } from "./_shared/toastMsg";
import { IconLink } from "../../assets";
import styles from "./detail.module.scss";

const Detail = () => {
  const ref = useRef(null);
  const { id } = useParams();
  const { pathname } = useLocation();
  const [movie, setMovie] = useState();
  const [toastFloat, setToastFloat] = useRecoilState(toastFloatState);
  const [toastMsg, setToastMsg] = useRecoilState(toastMsgState);
  const formattedRuntime = formatRuntime(movie?.runtime || 0);

  const onGetMovieDetail = async () => {
    try {
      const response = await getMovie(id);
      if (response.status === 200) {
        setMovie(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const toast = (msg) => {
    if (!toastFloat) {
      setToastFloat(true);
      setToastMsg(msgList[msg]);
    }
  };

  useEffect(() => {
    if (toastFloat) {
      setTimeout(() => {
        setToastFloat(false);
      }, 2000);
    }
  }, [toastFloat]);

  const onCopyClipBoard = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      toast("link");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!ref.current) return;

    ref.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  }, [pathname]);

  useEffect(() => {
    onGetMovieDetail();
  }, [id]);

  if (!movie) {
    return null;
  }

  return (
    <main ref={ref}>
      <Toast children={toastMsg} float={toastFloat} />
      <div className={styles.backgroundWrapper}>
        <img
          className={styles.backgroundImg}
          src={movie.postImage}
          alt="thumbnail"
        />
        <div className={styles.backgroundGradient} />
      </div>
      <section className={styles.wrapper}>
        <article className={styles.infoWrapper}>
          <div className={styles.title}>
            <h1>{movie.title}</h1>
            <IconLink onClick={onCopyClipBoard} />
          </div>
          <div className={styles.info}>
            <p>{formattedRuntime}</p>
            <p>{movie.genres.map((genre) => genre.name).join(", ")}</p>
            <p>{dayjs(movie.releasedAt, "YYYYMMDD").format("YYYY.MM.DD")}</p>
          </div>
        </article>
        <article className={styles.detailInfoWrapper}>
          <MovieInfo movie={movie} toast={toast} />
          <MovieComment
            movie={movie}
            // setToastMsg={setToastMsg}
            // setToastFloat={setToastFloat}
            // toastFloat={toastFloat}
            toast={toast}
          />
          <RelatedMovie movie={movie} />
        </article>
      </section>
    </main>
  );
};

export default Detail;
