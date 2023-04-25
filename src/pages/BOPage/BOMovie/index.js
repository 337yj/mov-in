import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";

import { getMovies, getMovie, getMoviesCount } from "../../../api/Movie";

import { SearchInput, Table, Button, Paging, Input } from "../../../components";
import { BoMovieModal } from "../_shared";
import cx from "classnames";
import styles from "./boMovie.module.scss";
import { IconSearch } from "../../../assets";

const columns = [
  { Header: "제목", accessor: "제목" },
  { Header: "감독", accessor: "감독" },
  { Header: "장르", accessor: "장르" },
  { Header: "평균평점", accessor: "평균평점" },
  { Header: "개봉일자", accessor: "개봉일자" },
];

const POST_PER_PAGE = 10;

const BOMovie = () => {
  const { id } = useParams;

  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

  const [selectedMovie, setSelectedMovie] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  const [form, setForm] = useState();
  const [Count, setCount] = useState();

  const [modal, setModal] = useState(false);

  const data = movies.map((movie) => ({
    id: movie.id,
    제목: movie.title ?? "-",
    감독: movie.staffs.find((staff) => staff.role === "감독")?.name ?? "-",
    장르: movie.genres.map((genre) => genre?.name).join(", ") ?? "-",
    평균평점: movie.averageScore?.toFixed(1) ?? "-",
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

  const onPageChange = (page) => {
    setPage(page);
  };

  const onSetData = (data, total) => {
    setMovies(data);
    setCount(total);
    setTotalCount(total);
  };

  const onGetMovies = async () => {
    try {
      const response = await getMovies(page, POST_PER_PAGE);
      if (response.status === 200) {
        setMovies(response.data.data);
        onSetData(response.data.data, response.data.paging.total);
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

  // 영화 검색 기능
  const onSearch = async () => {
    setPage(1);
    const response2 = await getMovies(1, POST_PER_PAGE, {
      title: form,
    });
    onSetData(response2.data.data, response2.data.paging.total);
  };

  const onSearchPageChange = async () => {
    const response2 = await getMovies(page, POST_PER_PAGE, form);
    onSetData(response2.data.data, response2.data.paging.total);
  };

  const onChange = (e) => {
    const { value } = e.currentTarget;

    //NOTE: 검색어가 있다가 사라지면 다시 데이터를 불러오는 로직
    if (value.length === 0) {
      onGetMovies();
    }
    setForm(value);
  };

  useEffect(() => {
    if (!form) {
      onGetMovies();
    } else {
      onSearchPageChange();
    }
  }, [page, modal]);

  useEffect(() => {
    onGetMovies();
    onGetMovieDetail(id);
    onGetMoviesCount();
  }, [page, id]);

  return (
    <main className={styles.wrapper}>
      <h1>영화 관리 페이지</h1>

      <div className={styles.searchWrapper}>
        <SearchInput
          onChange={onChange}
          name="title"
          value={form}
          placeholder="영화 제목을 입력해주세요."
          className={styles.searchInput}
          isAdmin
          onSubmit={onSearch}
        />
      </div>
      <Table
        columns={columns}
        data={data}
        setCheckedItems={setSelectedMovie}
        checkedItems={selectedMovie}
        firstButton={(movie) => (
          <Button color={"warning"} onClick={onClickModal(movie)}>
            보기
          </Button>
        )}
        secondButton={() => <Button color={"primary"}>수정</Button>}
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
        onChange={onPageChange}
      />
    </main>
  );
};

export default BOMovie;
