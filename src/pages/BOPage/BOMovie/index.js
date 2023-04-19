import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";

import { getMovies, getMovie, getMoviesCount } from "../../../api/Movie";

import { SearchInput, Table, Button, Paging } from "../../../components";
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
// const page = 1

const BOMovie = ({ movie }) => {
  const { id } = useParams;

  const [movies, setMovies] = useState([]);
  //NOTE: 선택된 영화를 관리하기 위한 state -> 선택된 movie의 id
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [page, setPage] = useState(1); // 현재 페이지
  const [totalCount, setTotalCount] = useState(0);

  const [modal, setModal] = useState(false);

  const data = movies.map((movie) => ({
    //NOTE: substring을 통한 문자열 자르기
    // 제목: movie.title.substring(0, 10),
    id: movie.id,
    제목: movie.title ?? "-",
    감독: movie.staffs.find((staff) => staff.role === "감독")?.name ?? "-",
    장르: movie.genres.map((genre) => genre?.name).join(", ") ?? "-",
    평균평점: movie.averageScore.toFixed(1) ?? "-",
    개봉일자: dayjs(movie.releasedAt, "YYYYMMDD").format("YYYY.MM.DD") ?? "-",
  }));

  const onClickModal = (movie) => {
    return () => {
      setModal(!modal);
      setSelectedMovie(movie);
    };
  };

  const onCloseModal = () => {
    setModal(!modal);
    setSelectedMovie(null);
  };

  const onChange = (page) => {
    setPage(page);
  };

  const onGetMovies = async () => {
    try {
      const response = await getMovies(page, POST_PER_PAGE);
      if (response.status === 200) {
        setMovies(response.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onGetMovieDetail = async () => {
    try {
      const response = await getMovie(id);
      if (response.status === 200) {
        const data = response.data;
        setSelectedMovie(data);
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
    onGetMovieDetail(id);
    onGetMoviesCount();
  }, [page, id]);

  console.log({ selectedMovie });

  return (
    <main className={styles.wrapper}>
      <h1>영화 관리 페이지</h1>
      <div className={styles.search}>
        <SearchInput placeholder={"영화명을 검색하세요."} />
        <Button color={"primary"} onClick={onsubmit}>
          수정
        </Button>
      </div>
      <Table
        columns={columns}
        data={data}
        firstButton={
          // NOTE: 어떤 영화를 선택했는지 알 수가 없다.
          // NOTE: 선택한 영화를 담을 state가 없다.
          // NOTE: 아래와 같이 함수를 사용
          (movie) => (
            <Button color={"warning"} onClick={onClickModal(movie)}>
              보기
            </Button>
          )
        }
        secondButton={<Button color={"primary"}>수정</Button>}
      />
      <BoMovieModal
        movieId={selectedMovie}
        modal={modal}
        onCloseModal={onCloseModal}
      />
      <Paging
        totalCount={totalCount}
        page={page}
        postPerPage={POST_PER_PAGE}
        pageRangeDisplayed={5}
        onChange={onChange}
      />
    </main>
  );
};

export default BOMovie;
