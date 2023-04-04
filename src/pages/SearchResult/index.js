import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { getMovies } from "../../api/Movie";
import { Card } from "../../components";
//import { RecommendMovie } from "./RecommendMovie";
import styles from "./search.module.scss";

const SearchResult = () => {
  const { state } = useLocation();
  const [movies, setMovies] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const searchText = state.keyword;

  const filteredFirst = movies.filter((item) =>
    item.title.replace(/ /g, "").includes(searchText.replace(/ /g, "")),
  );

  const result = [...filteredFirst];

  const onGetMovies = async () => {
    const response = await getMovies(1, 200);

    if (response.status === 200) {
      const items = [...response.data.data];
      setMovies(items);
      setIsSuccess(true);
    }
  };

  useEffect(() => {
    setIsSuccess(false);
    onGetMovies();
  }, []);

  return (
    <main className={styles.body}>
      {searchText !== "" && result.length !== 0 && (
        <div className={styles.searchedMovies}>
          <h2>{`"${searchText}"의 검색 결과입니다.`}</h2>
          <div className={styles.showMovies}>
            {result.map((item) => {
              return <Card movie={item} key={item.id} />;
            })}
          </div>
        </div>
      )}
      {(searchText === "" || result.length === 0) && isSuccess && (
        <div className={styles.searchedNoMovies}>
          <h2>{`입력하신 검색어 "${searchText}" 와(과) 일치하는 결과가 없습니다.`}</h2>
          <div>
            도움이 필요하신가요?
            <br />
            단어나 문장이 정확한지 확인해보세요.
            <br />
            오타가 없는지 확인해보세요.
            <br />
            검색어의 단어 수를 줄이거나, 다른 검색어로 검색해보세요.
          </div>
        </div>
      )}
    </main>
  );
};

export default SearchResult;

// const SearchResult = () => {
//   const { state } = useLocation();
//   const [movie, setMovie] = useState([]);
//   const [isFind, setIsFind] = useState(false);
//   const { searchText } = useParams();

//   const searchTitle = movie.filter((item) =>
//     item.title?.replace(/ /g, "").includes(searchText?.replace(/ /g, "")),
//   );

//   const totalResult = [...searchTitle];

//   const onGetMovies = async () => {
//     try {
//       const response = await getMovies();
//       if (response.status === 200) {
//         const items = [response.data.data];
//         setMovie(items);
//         setIsFind(!isFind);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const onNavigateDetail = (id) => {
//     return () => {
//       navigate(`/movies/detail/${id}`);
//     };
//   };

//   useEffect(() => {
//     setIsFind(false);
//     onGetMovies();
//   }, []);

//   console.log(state);

//   return (
//     <main>
//       {searchText !== "" && totalResult.length !== 0 && (
//         <section className={styles.movieInfo}>
//           <h2>{`"${searchText}"에 대한 검색 결과입니다.`}</h2>
//           <article>
//             {totalResult.map((item) => {
//               return (
//                 <Card
//                   key={item.id}
//                   item={item}
//                   onClick={onNavigateDetail(item.id)}
//                 />
//               );
//             })}
//           </article>
//         </section>
//       )}
//       {(searchText === "" || totalResult.length === 0) && isFind && (
//           <section className={styles.noMovieInfo}>
//             <h2>
//               <span>{`${searchText}`}</span>에 대한 결과가 없습니다.
//             </h2>
//             <article>
//               <ul>
//                 도움이 필요하신가요?
//                 <li>단어나 문장이 정확한지 확인해보세요.</li>
//                 <li>오타가 없는지 확인해보세요.</li>
//                 <li>
//                   검색어의 단어 수를 줄이거나, 다른 검색어로 검색해보세요.
//                 </li>
//               </ul>
//             </article>
//           </section>
//           /* <RecommendMovie /></> */
//       )}
//     </main>
//   );
// };

// export default SearchResult;
