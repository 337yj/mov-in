import React, { useEffect, useRef, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getMovie } from "../../api/Movie";
import { RelatedMovie, MovieComment, MovieInfo } from "./movieDetail";
import CommentDetail from "./CommentList/CommentDetail";
import CommentList from "./CommentList";
import { IconLink } from "../../assets";
import { Toast } from "../../components";
import dayjs from "dayjs";
import styles from "./detail.module.scss";

const Detail = () => {
  const ref = useRef(null);
  const { id } = useParams();
  const { pathname } = useLocation();

  const [movie, setMovie] = useState();
  const [tab, setTab] = useState("movieDetail");
  const [toastFloat, setToastFloat] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState(null);

  const runtimeInMinutes = movie?.runtime || 0;
  const hours = Math.floor(runtimeInMinutes / 60);
  const minutes = runtimeInMinutes % 60;
  const formattedRuntime = `${hours}시간 ${minutes}분`;

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
    } catch (err) {
      console.log(err);
    }
  };

  const onChangeTab = (tab) => {
    if (tab !== "commentDetail") {
      setSelectedCommentId(null);
    }
    setTab(tab);
  };

  const onChangeSelectedCommentId = (id) => {
    setSelectedCommentId(id);
  };

  const detailInfo = {
    // movieInfo: <MovieInfo movie={movie} onChangeTab={onChangeTab} />,
    // movieComment: <MovieComment onChangeTab={onChangeTab} />,
    // // commentDetail: <CommentDetail />,
    // relatedMovie: <RelatedMovie onChangeTab={onChangeTab} />,
    movieDetail: (
      <>
        <MovieInfo movie={movie} />
        <MovieComment
          movie={movie}
          onChangeTab={onChangeTab}
          onChangeSelectedCommentId={onChangeSelectedCommentId}
        />
        <RelatedMovie movie={movie} />
      </>
    ),
    commentDetail: (
      <CommentDetail movie={movie} selectedCommentId={selectedCommentId} />
    ),
    commentList: (
      <CommentList
        movie={movie}
        onChangeTab={onChangeTab}
        onChangeSelectedCommentId={onChangeSelectedCommentId}
      />
    ),
  };

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
  }, [id]);

  if (!movie) {
    return null;
  }

  return (
    <main ref={ref}>
      {toastFloat && (
        <div className={styles.toastWrapper}>
          <Toast>링크가 복사되었습니다.</Toast>
        </div>
      )}
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
        {/* //NOTE: 여기에 있는 article은 삭제 가능 */}
        <article className={styles.detailInfoWrapper}>
          {/* {tab === "movieInfo" && <MovieInfo movie={movie} />} */}

          {detailInfo[tab]}
          {/* <MovieInfo movie={movie} />
          <MovieComment />
          <RelatedMovie /> */}
          {/* <MovieDetail movie={movie} /> */}
        </article>
      </section>
    </main>
  );
};

export default Detail;
