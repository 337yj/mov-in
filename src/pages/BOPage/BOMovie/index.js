import React, { useEffect, useState } from "react";
import dayjs from "dayjs";

import { getMovies, getMoviesCount } from "../../../api/Movie";

import { Table, Button, Paging } from "../../../components";
import { BoMovieModal } from "../_shared";

import styles from "./boMovie.module.scss";

const columns = [
  { Header: "제목", accessor: "제목" },
  { Header: "감독", accessor: "감독" },
  { Header: "장르", accessor: "장르" },
  { Header: "평균평점", accessor: "평균평점" },
  { Header: "개봉일자", accessor: "개봉일자" },
];

const POST_PER_PAGE = 10;

const BOMovie = ({ movie }) => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState([]); // 보여줄 페이지
  const [page, setPage] = useState(1); // 현재 페이지
  const nextPage = page * POST_PER_PAGE;
  const PrevPage = nextPage - POST_PER_PAGE;
  const [totalCount, setTotalCount] = useState(0);

  const [modal, setModal] = useState(false);

  const data = movies.map((movie) => ({
    제목: movie.title,
    감독: movie.staffs.find((staff) => staff.role === "감독")?.name,
    장르: movie.genres.map((genre) => genre?.name).join(", "),
    평균평점: movie.averageScore.toFixed(1),
    개봉일자: dayjs(movie.releasedAt, "YYYYMMDD").format("YYYY.MM.DD"),
  }));

  const onClickModal = () => {
    setModal(!modal);
  };

  const onChange = (page) => {
    setPage(page);
  };

  const onGetMovies = async () => {
    try {
      const response = await getMovies(page, POST_PER_PAGE);
      if (response.status === 200) {
        const newMovies = [...response.data.data];
        setMovies([...movies, ...newMovies]);
        setCurrentPage([...movies, ...newMovies]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onGetMoviesCount = async () => {
    try {
      const response = await getMoviesCount();
      if (response.status === 200) {
        setTotalCount(response.data.count);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    onGetMovies();
    onGetMoviesCount();
  }, [page]);

  console.log(movies);
  return (
    <section className={styles.wrapper}>
      <h1>영화 관리 페이지</h1>
      <Table
        columns={columns}
        data={data}
        firstButton={
          <Button color={"warning"} children={"보기"} onclick={onClickModal} />
        }
        secondButton={<Button color={"primary"} children={"삭제"} />}
      />
      <BoMovieModal movie={movie} modal={modal} setModal={setModal} />
      <Paging
        totalCount={totalCount}
        page={page}
        postPerPage={POST_PER_PAGE}
        pageRangeDisplayed={5}
        onChange={onChange}
      />
    </section>
  );
};

export default BOMovie;
