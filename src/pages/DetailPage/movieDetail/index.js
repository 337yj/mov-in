import React from "react";
import { Button } from "../../../components";
import MovieComment from "./movieComment";
import MovieInfo from "./movieInfo";
import RelatedMovie from "./relatedMovie";
import styles from "./movieDetail.module.scss";

const MovieDetail = ({ movie }) => {
  return (
    <section className={styles.wrapper}>
      <MovieInfo movie={movie} />
      <MovieComment />
      <RelatedMovie />
    </section>
  );
};

export default MovieDetail;

// import dayjs from "dayjs";
// import React, { useCallback, useEffect, useState } from "react";
// import { useParams, useLocation } from "react-router-dom";
// import { getMovie } from "../../api/Movie";
// import { IconLink } from "../../assets";
// import { Toast } from "../../components";
// import styles from "./detail.module.scss";

// const Detail = () => {
//   //NOTE: state => path variable  (/detail/:id)
//   const { id } = useParams();
//   const location = useLocation();

//   console.log(location);
//   const [movie, setMovie] = useState();
//   // const [toastFloat, setToastFloat] = useState(false);
//   const runtimeInMinutes = movie?.runtime || 0;
//   const hours = Math.floor(runtimeInMinutes / 60);
//   const minutes = runtimeInMinutes % 60;
//   const formattedRuntime = `${hours}시간 ${minutes}분`;

//   const onGetMovieDetail = async () => {
//     try {
//       const response = await getMovie(id);
//       if (response.status === 200) {
//         setMovie(response.data);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     onGetMovieDetail();
//   }, [id]);

//   if (!movie) {
//     return null; // 로딩 중일 때는 null을 반환해서 아무것도 렌더링하지 않도록 함
//   }

//   const onCopyClipBoard = async (text) => {
//     const url = `http:/localhost:3000/${location.pathname}`;
//     console.log(url); // 생성된 URL을 확인
//     try {
//       await navigator.clipboard.writeText(text);
//       // alert("클립보드에 링크가 복사되었어요.");

//       setToastFloat(true);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <main>
//       {/* {toastFloat && <Toast msg="copy" />} */}
//       <div className={styles.backgroundWrapper}>
//         <div className={styles.backgroundGradient} />
//         <img
//           className={styles.backgroundImg}
//           src={movie.postImage}
//           alt="thumbnail"
//         />
//       </div>
//       <section className={styles.wrapper}>
//         <div className={styles.infoWrapper}>
//           <div className={styles.titleWrapper}>
//             <h1>{movie.title}</h1>
//             <IconLink onClick={onCopyClipBoard} />
//           </div>

//           <div className={styles.infoWrapper}>
//             | <p>{formattedRuntime}</p>| {movie.genres.name}
//             {movie.genres.map((genre) => genre.name).join(", ")} |
//             {dayjs(movie.releasedAt, "YYYYMMDD").format("YYYY.MM.DD")}
//           </div>
//         </div>
//         <article>
//           <div>
//             <img src={movie.postImage} alt="thumbnail"></img>
//             <Button />
//           </div>
//           <div>
//             <p>평균평점</p>
//             <p>출연/제작</p>
//             <p>줄거리{movie.plot}</p>
//           </div>
//         </article>
//       </section>
//     </main>
//   );
// };

// export default Detail;
