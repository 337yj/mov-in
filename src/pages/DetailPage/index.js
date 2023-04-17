import React, { useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { getMovie } from "../../api/Movie";
import { commentIdState } from "../../state";
import { MovieComment, MovieInfo, RelatedMovie } from "./movieDetail";

import dayjs from "dayjs";
import { IconLink } from "../../assets";
import { Toast } from "../../components";
import { formatRuntime } from "./_shared/formatRuntime";
import styles from "./detail.module.scss";
import { getMovieMyReview, getReviewsMovie } from "../../api/Review";

const Detail = () => {
  const ref = useRef(null);
  const { id } = useParams();
  const { pathname } = useLocation();
  const [movie, setMovie] = useState();
  //NOTE: tab은 리코일로 사용하는게 더 편하다
  const [toastFloat, setToastFloat] = useState(false);
  // const [comments, setComments] = useState([]);
  // const [myComment, setMyComment] = useState();
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

  const onCopyClipBoard = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      setToastFloat(true);
      setTimeout(() => {
        setToastFloat(false);
      }, 1500);
    } catch (error) {
      console.log(error);
    }
  };
  //NOTE: 같이 API를 많이 사용하거나, 생성 수정 삭제 등의 데이터의 변경이 일어나는 경우에는
  //NOTE: tab을 통해서 구분하는 것보다 페이지를 만드는게 정신건강에 좋다.
  //NOTE: 방법2) react-query 사용
  // const onGetComments = async () => {
  //   const response = await getReviewsMovie(id);
  //   setComments(response.data);
  // };

  // const onGetMyComment = async () => {
  //   const response = await getMovieMyReview(id);
  //   if (response.status === 200) {
  //     if (response.data) setMyComment(response.data);
  //   }
  // };

  useEffect(() => {
    if (!ref.current) return;

    //NOTE: ref를 사용해서 스크롤 위치를 변경
    ref.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  }, [pathname]);

  useEffect(() => {
    onGetMovieDetail();
    // onGetComments();
    // onGetMyComment();
  }, [id]);

  if (!movie) {
    return null;
  }

  return (
    <main ref={ref}>
      <Toast float={toastFloat}>링크가 복사되었습니다.</Toast>
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
          <MovieInfo movie={movie} />
          <MovieComment movie={movie} />
          <RelatedMovie movie={movie} />
        </article>
        {/* <CommentModal
        movie={movie}
        title={movie.title}
        modal={modal}
        setModal={setModal}
        onGetMovieComments={async () => {
          await onGetMovieComment();
          await onGetMyComment();
        }}
      /> */}
      </section>
    </main>
  );
};

export default Detail;
