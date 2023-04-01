import dayjs from "dayjs";
import React, { useCallback, useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getMovie } from "../../api/Movie";
import { IconLink } from "../../assets";
import { Toast } from "../../components";
import styles from "./detail.module.scss";
import MovieDetail from "./movieDetail";
import MovieComment from "./movieDetail/movieComment";
import MovieInfo from "./movieDetail/movieInfo";
import RelatedMovie from "./movieDetail/relatedMovie";

const Detail = () => {
  //NOTE: state => path variable  (/detail/:id)
  const { id } = useParams();
  const location = useLocation();

  console.log(location);
  const [movie, setMovie] = useState();
  const [tab, setTab] = useState("movieDetail");
  // const [toastFloat, setToastFloat] = useState(false);
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
  const onCopyClipBoard = async (text) => {
    const url = `http:/localhost:3000/${location.pathname}`;
    console.log(url);
    try {
      await navigator.clipboard.writeText(text);
      // alert("클립보드에 링크가 복사되었어요.");

      setToastFloat(true);
    } catch (err) {
      console.log(err);
    }
  };

  const onChangeTab = (tab) => {
    setTab(tab);
  };

  const detailInfo = {
    // movieInfo: <MovieInfo movie={movie} onChangeTab={onChangeTab} />,
    // movieComment: <MovieComment onChangeTab={onChangeTab} />,
    // // commentDetail: <CommentDetail />,
    // relatedMovie: <RelatedMovie onChangeTab={onChangeTab} />,
    movieDetail: (
      <>
        <MovieInfo movie={movie} />
        <MovieComment movie={movie} />
        <RelatedMovie movie={movie} />
      </>
    ),
  };

  useEffect(() => {
    onGetMovieDetail();
  }, [id]);

  if (!movie) {
    return null;
  }

  return (
    <main>
      {/* {toastFloat && <Toast msg="copy" />} */}
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
        {/* //NOTE: 여기에 있는 aritcle은 삭제 가능 */}
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
