/* eslint-disable */
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { getMovies } from "../../api/Movie";
import { Card } from "../../components";
import cx from "classnames";
//import { RecommendMovie } from "./RecommendMovie";
import styles from "./search.module.scss";

const SearchResult = () => {
  const { state } = useLocation();
  const [movies, setMovies] = useState([]);
  const [isFind, setIsFind] = useState(false);
  const searchText = state.keyword;

  const searchAll = movies.filter(
    (item) =>
      item.title.replace(/ /g, "").includes(searchText.replace(/ /g, "")) ||
      item.staffs.some((staff) =>
        staff.name.replace(/ /g, "").includes(searchText.replace(/ /g, "")),
      ),
  );

  const result = [...searchAll];

  const onGetMovies = async () => {
    const response = await getMovies(1, 200, searchText);
    if (response.status === 200) {
      const items = [...response.data.data];
      setMovies(items);
      setIsFind(!isFind);
    }
  };
  console.log(movies);
  useEffect(() => {
    setIsFind(false);
    onGetMovies();
  }, [searchText]);

  return (
    <main className={styles.searchWrapper}>
      {searchText !== "" && result.length !== 0 && (
        <section>
          <h2 className={styles.searchTitle}>
            '<span className={styles.strongWord}>{searchText}</span>' 에 대한
            검색 결과입니다.
          </h2>
          <div className={styles.resultStyle}>
            {result.map((item) => {
              return (
                <li key={item.id} className={styles.resultCard}>
                  <Card movie={item} />
                </li>
              );
            })}
          </div>
        </section>
      )}
      {(searchText === "" || result.length === 0) && isFind && (
        <section>
          <h2 className={styles.searchTitle}>
            '<span className={styles.strongWord}>{searchText}</span>' 에 대한
            결과를 찾지 못했습니다 :/
          </h2>
          <div className={styles.helpWrapper}>
            <h4>도움이 필요하신가요?</h4>
            <ul>
              <li>단어나 문장이 정확한지 확인해보세요.</li>
              <li>오타가 없는지 확인해보세요.</li>
              <li>검색어의 단어 수를 줄이거나, 다른 검색어로 검색해보세요.</li>
              <li className={styles.emailStyle}>
                teamtwo@movin.com으로 메일을 보내주세요.
              </li>
            </ul>
          </div>
          {/* <RecommendMovie /> */}
        </section>
      )}
    </main>
  );
};

export default SearchResult;
