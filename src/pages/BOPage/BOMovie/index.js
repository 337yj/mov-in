import React, { useEffect, useState } from "react";
import { getMovies } from "../../../api/Movie";
import { Table } from "../../../components";
import styles from "./boMovie.module.scss";

const columns = [
  { Header: "제목", accessor: "제목" },
  { Header: "감독", accessor: "감독" },
  { Header: "장르", accessor: "장르" },
  { Header: "평균평점", accessor: "평균평점" },
  { Header: "개봉일자", accessor: "개봉일자" },
];

const BOMovie = () => {
  const [movies, setMovies] = useState([]);
  const data = movies.map((movie) => ({
    제목: movie.title,
    감독: movie.staffs.find((staff) => staff.role === "감독")?.name,
    장르: movie.genres.map((genre) => genre?.name).join(", "),
    평균평점: movie.averageScore,
    개봉일자: movie.releasedAt,
  }));

  const onGetMovies = async () => {
    try {
      const response = await getMovies();
      if (response.status === 200) {
        const items = [...response.data.data];
        setMovies(items);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    onGetMovies();
  }, []);

  console.log(movies);
  return (
    <section>
      <h1>영화관리페이지</h1>
      <Table columns={columns} data={data} />
    </section>
  );
};

export default BOMovie;
