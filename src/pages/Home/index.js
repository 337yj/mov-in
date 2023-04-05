import React, { useEffect, useState } from "react";
import {
  getMovies,
  getMovie,
  getMoviesCategories,
  getMoviesGenre,
  getMoviesTop,
} from "../../api/Movie";
import Carousel from "../../components/Common/Carousel";
import genre from "./Genre/genre";
import styles from "./home.module.scss";

const Home = () => {
  const [movie, setMovie] = useState([]);
  const [topTen, setTopTen] = useState([]);
  const [genreList, setGenreList] = useState([]);
  const [romanceList, setRomanceList] = useState([]);
  const [mainInfo, setMainInfo] = useState([]);
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
        if (genreId.includes("fc84777a-d713-4539-a5b9-8c24f0c85b99")) {
          let newArr = [...genreList, ...items];
          setGenreList(newArr);
          // console.log(genreList);
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

  const onGetRomanceGenre = async (genreId) => {
    try {
      const response = await getMoviesGenre(1, 20, genreId);
      if (response.status === 200) {
        const items = [...response.data.data];
        if (genreId.includes("73fa7e1d-0e3e-4506-9432-21c29faa8dd7")) {
          let romanceArr = [...romanceList, ...items];
          setRomanceList(romanceArr);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  const onMain = async (id) => {
    try {
      const response = await getMovie(id);
      if (response.status === 200) {
        const items = [...response.data.data];
        if (id === "d52bc79e-3c3b-4c73-ab80-76a80cd331fb") {
          let mainArr = [...mainInfo, ...items];
          setMainInfo(mainArr);
        }
      }
    } catch (error) {
      console.error(error);
    }
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
    genre.forEach(({ id }) => onGetRomanceGenre(id));
  }, []);

  return (
    <main className={styles.wrapper}>
      <section>
        <div className={styles.bgWrapper}>
          <div className={styles.textWrapper}>
            <h4>나를 구하지 마세요</h4>

          </div>
        </div>
        <div className={styles.listWrapper}>
          <h1 className={styles.mainTitle}>인기 10위 영화</h1>
          <Carousel  slidesToShow="4" slidesToScroll="4" movies={topTen} />
          <h1 className={styles.mainTitle}>연애 세포를 깨우는 로맨스</h1>
          <Carousel slidesToShow="5" slidesToScroll="5" movies={romanceList} />
          <h1 className={styles.mainTitle}>긴장감 넘치는 액션 영화</h1>
          <Carousel slidesToShow="5" slidesToScroll="5" movies={genreList} />
        </div>
        {/* <h1 className={styles.header}>최신순</h1>
        <Carousel slidesToShow="5" slidesToScroll="5" movies={} />
        <h1 className={styles.header}>로맨스</h1>
        <Carousel slidesToShow="5" slidesToScroll="5" movies={} />
        <h1 className={styles.header}>공포</h1>
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
