import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table } from "../../../components/Common";
import { LNB } from "../../../components/Layout";
import axios from "axios";
import styles from "./boUser.module.scss";
import { getMovies } from "../../../api/Movie";

const columns = [
  { Header: "제목", accessor: "movie" },
  { Header: "감독", accessor: "actor" },
  { Header: "장르", accessor: "genres" },
  { Header: "평균평점", accessor: "averageScore" },
  { Header: "개봉일자", accessor: "releasedAt" },
];

const BOUser = () => {
  const [movies, setMovies] = useState([]);
  const data = movies.map((movie) => ({
    제목: movie.title,
    감독: movie.staffs.find((staff) => staff.role === "감독"),
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
    <section className={styles.wrapper}>
      <div>유저관리페이지</div>
      <Table columns={columns} data={data} />
    </section>
  );
};

export default BOUser;
