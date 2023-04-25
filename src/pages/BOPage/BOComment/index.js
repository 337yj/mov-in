import React, { useState, useEffect } from "react";
import { useParams } from "react-router";

import {
  getReviewsCount,
  getReviews,
  deleteAdminReviews,
  getReviewsDetail,
  deleteManyReviews,
} from "../../../api/Review";

import { Table, Button, Paging } from "../../../components";
import { BoCommentModal, SearchInput } from "../_shared";

import styles from "./boComment.module.scss";
import dayjs from "dayjs";

const columns = [
  { Header: "닉네임", accessor: "닉네임" },
  { Header: "코멘트", accessor: "코멘트" },
  { Header: "평점", accessor: "평점" },
  { Header: "좋아요", accessor: "좋아요" },
  { Header: "작성일자", accessor: "작성일자" },
];

const POST_PER_PAGE = 10;

const BOComment = ({ Review }) => {
  const { id } = useParams;

  const [Reviews, setReviews] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedReview, setSelectedReview] = useState([]);
  const [clickedReview, setClickedReview] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [form, setForm] = useState();

  // const [toastFloat, setToastFloat] = useState(false);
  // const [toastMsg, setToastMsg] = useState("");

  const [modal, setModal] = useState(false);

  const data = Reviews.map((Review) => ({
    id: Review.id,
    닉네임: Review.nickname ?? "-",
    코멘트: Review.content ?? "-",
    평점: Review.score.toFixed(1) ?? "-",
    좋아요: Review.likeCount ?? "-",
    작성일자: dayjs(Review.createdAt, "YYYYMMDD").format("YYYY.MM.DD") ?? "-",
  }));

  const onClickModal = (Review) => {
    return () => {
      setModal(!modal);
      setClickedReview(Review);
    };
  };

  const onCloseModal = () => {
    setModal(false);
    setClickedReview(null);
  };

  const onChange = (page) => {
    setPage(page);
  };

  const onClickManyDelete = async () => {
    const response = await deleteManyReviews(selectedReview.join(","));
    if (response.status === 204) {
      onGetReviews();
      onGetSelectReview();
      alert("삭제되었습니다.");
    }
  };

  const onClickDelete = (id) => {
    return async () => {
      const response = await deleteAdminReviews(id);
      if (response.status === 204) {
        onGetReviews();
        onGetSelectReview();
        alert("삭제되었습니다.");
      }
    };
  };

  const onGetReviews = async () => {
    try {
      const response = await getReviews(page, POST_PER_PAGE);
      if (response.status === 200) {
        setReviews(response.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onSearchReviews = async () => {
    try {
      const response = await getReviews(page, POST_PER_PAGE, form);
      if (response.status === 200) {
        setReviews(response.data.data);
        setTotalCount(response.data.paging.total);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onGetReviewsCount = async () => {
    try {
      const response = await getReviewsCount();
      if (response.status === 200) {
        setTotalCount(response.data.count);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onGetSelectReview = async () => {
    try {
      const response = await getReviewsDetail(id);
      if (response.status === 200) {
        const data = response.data;
        setSelectedReview(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onChangeInput = (e) => {
    const { value } = e.currentTarget;

    //NOTE: 검색어가 있다가 사라지면 다시 데이터를 불러오는 로직
    if (value.length === 0) {
      onGetReviews();
    }
    setForm(value);
  };

  useEffect(() => {
    onGetReviews();

    onGetReviewsCount();
  }, [page, id]);

  return (
    <main className={styles.wrapper}>
      <h1>코멘트 관리 페이지</h1>
      <div className={styles.searchWrapper}>
        <SearchInput
          className={styles.searchInput}
          value={form}
          onChange={onChangeInput}
          placeholder={"회원 닉네임을 검색하세요."}
          onSubmit={onSearchReviews}
        />
        <Button
          className={styles.delete}
          color={"primary"}
          onClick={onClickManyDelete}
        >
          삭제
        </Button>
      </div>

      <Table
        columns={columns}
        data={data}
        checkedItems={selectedReview}
        setCheckedItems={setSelectedReview}
        firstButton={(Review) => (
          <Button color={"warning"} onClick={onClickModal(Review)}>
            보기
          </Button>
        )}
        secondButton={(id) => (
          <Button color={"primary"} onClick={onClickDelete(id)}>
            삭제
          </Button>
        )}
      />
      <BoCommentModal
        reviewId={clickedReview}
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

export default BOComment;
