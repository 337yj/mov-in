import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import cx from "classnames";
import {
  getMovies,
  getMovie,
  getMoviesCategories,
  getMoviesGenre,
  getMoviesTop,
} from "../../api/Movie";
import { Button, Carousel } from "../../components/Common";
import genre from "./Genre/genre";
import { BsStarFill } from "react-icons/bs";
import styles from "./home.module.scss";

const HORROR_ID = "a3864a82-d9c1-4bf5-a891-0acc2e479090";
const ROMANCE_ID = "73fa7e1d-0e3e-4506-9432-21c29faa8dd7";
const ACTION_ID = "fc84777a-d713-4539-a5b9-8c24f0c85b99";
const FANTASY_ID = "360b5842-fc83-4ea9-a7fa-0d62017b975b";
const MAIN_ID = "5ca6ee50-5db9-4446-8f39-3db4890894cb";

const Home = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState([]);
  const [topTen, setTopTen] = useState([]);
  const [genreList, setGenreList] = useState([]);
  const [romanceList, setRomanceList] = useState([]);
  const [horrorList, setHorrorList] = useState([]);
  const [fantasyList, setFantasyList] = useState([]);
  //NOTE: setInterval을 사용해서 mainInfo를 시간이 지남에 따라 교체

  const [mainInfo, setMainInfo] = useState();
  //const [allGenre, setAllGenre] = useState([]);

  const onGetMovies = async () => {
    try {
      const response = await getMovies();
      if (response.status === 200) {
        const items = [...response.data.data];
        setMovie(items);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onGetTopTen = async () => {
    try {
      const response = await getMoviesTop();
      if (response.status === 200) {
        const items = [...response.data.data];
        setTopTen(items);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onGetPerGenre = async (genreId) => {
    try {
      const response = await getMoviesGenre(1, 20, genreId);
      if (response.status === 200) {
        const items = [...response.data.data];
        if (genreId.includes(ACTION_ID)) {
          let action = [...genreList, ...items];
          setGenreList(action);
        } else if (genreId.includes(HORROR_ID)) {
          let horror = [...horrorList, ...items];
          setHorrorList(horror);
        } else if (genreId.includes(ROMANCE_ID)) {
          let romance = [...romanceList, ...items];
          setRomanceList(romance);
        } else if (genreId.includes(FANTASY_ID)) {
          let fantasy = [...fantasyList, ...items];
          setFantasyList(fantasy);
        }
      }
    } catch (error) {
      console.error(error);
    }
    // console.log(page);
    // console.log(postPerPage);
    // console.log(indexOfLastPost);
    // console.log(indexOfFirstPost);
    // console.log(posts);
  };

  const onGetMainDetail = async () => {
    try {
      const response = await getMovie(MAIN_ID);
      if (response.status === 200) {
        setMainInfo(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onClickDetail = () => {
    navigate(`/detail/${MAIN_ID}`);
  };

  // useEffect(() => {
  //   const fantasyGenre = genreList.filter((movie) =>
  //     movie.genres.some((genre) => genre.genre === "멜로/로맨스"),
  //   );

  //   const uniqueMovies = Array.from(
  //     new Set(fantasyGenre.map((movie) => movie.id)),
  //   ).map((id) => {
  //     return fantasyGenre.find((movie) => movie.id === id);
  //   });

  //   if (uniqueMovies.length > 0) {
  //     setSelect(uniqueMovies);
  //   }
  // }, [genreList]);

  useEffect(() => {
    onGetMovies();
    onGetTopTen();

    genre.forEach(({ id }) => onGetPerGenre(id));
  }, []);

  useEffect(() => {
    onGetMainDetail();
  }, [id]);

  return (
    <main className={styles.wrapper}>
      <section>
        <div className={styles.bgWrapper}>
          <div className={styles.textWrapper}>
            <h1>{mainInfo?.title}</h1>
            <p>
              {dayjs(mainInfo?.releasedAt, "YYYYMMDD").format("YYYY.MM")}
              <span>
                <BsStarFill className={styles.star} />
                {mainInfo?.averageScore?.toFixed(1)}
              </span>
            </p>
            <p className={styles.plot}>{mainInfo?.plot}</p>
            <Button color={"warning"} children={"더보기"} className={styles.btnStyle} onClick={onClickDetail}/>
          </div>
        </div>
        <div className={styles.listWrapper}>
          <h1 className={styles.mainTitle}>
            인기 10위 영화
          </h1>
          <Carousel slidesToShow="4" slidesToScroll="4" movies={topTen} />
          <h1 className={styles.mainTitle}>연애세포를 깨우는 로맨스 영화</h1>
          <Carousel slidesToShow="5" slidesToScroll="5" movies={romanceList} />
          <h1 className={styles.mainTitle}>긴장감 넘치는 액션 영화</h1>
          <Carousel slidesToShow="5" slidesToScroll="5" movies={genreList} />
          <h1 className={styles.mainTitle}>오싹한 공포 영화</h1>
          <Carousel slidesToShow="5" slidesToScroll="5" movies={horrorList} />
          {/* <h1 className={styles.mainTitle}>판타지</h1>
          <Carousel slidesToShow="5" slidesToScroll="5" movies={fantasyList} /> */}
        </div>
        {/* <h1 className={styles.header}>최신순</h1>
        <Carousel slidesToShow="5" slidesToScroll="5" movies={} />
        <ul>
          {select.map((movie) => (
            <li key={movie.id}>
              <img src={movie.postImage} alt={movie.title} />
            </li>
          ))}
        </ul> */}
      </section>
    </main>
  );
};

export default Home;

// const onGetAllCategories = async () => {
//   try {
//     const response = await getMoviesCategories();
//     if (response.status === 200) {
//       setAllGenre(response.data);
//     }
//   } catch (error) {
//     console.error(error);
//   }
// };

// useEffect(() => {
//   onGetAllCategories();
// }, []);

// useEffect(() => {
//   console.log(allGenre);
// }, [allGenre]);
