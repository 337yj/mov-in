import React, { useEffect, useState } from "react";
import {
  getMovies,
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
  const [allGenre, setAllGenre] = useState([]);

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
        let newArr = [...genreList, ...items];
        setGenreList(newArr);
        // console.log(genreList);
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

  return (
    <main className={styles.wrapper}>
      <section className={styles.genreWrapper}>
        <h1 className={styles.header}>Top 10</h1>
        <Carousel slidesToShow="4" slidesToScroll="4" movies={topTen} />
        {/* <h1 className={styles.header}>최신순</h1>
        <Carousel slidesToShow="5" slidesToScroll="5" movies={} />
        <h1 className={styles.header}>로맨스</h1>
        <Carousel slidesToShow="5" slidesToScroll="5" movies={} />
          <h1 className={styles.header}>액션</h1>
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
