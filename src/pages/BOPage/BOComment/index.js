import React, { useState, useEffect } from "react";
import { useParams } from "react-router";

import {
  getReviewsCount,
  getReviews,
  deleteAdminReviews,
  getReviewsDetail,
  deleteManyReviews,
} from "../../../api/Review";

import { SearchInput, Table, Button, Paging } from "../../../components";
import { BoCommentModal } from "../_shared";

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
  const [selectedReview, setSelectedReview] = useState(null);
  const [totalCount, setTotalCount] = useState(0);

  // const [toastFloat, setToastFloat] = useState(false);
  // const [toastMsg, setToastMsg] = useState("");

  const [modal, setModal] = useState(false);

  const data = Reviews.map((Review) => ({
    닉네임: Review.nickname ?? "-",
    코멘트: Review.content ?? "-",
    평점: Review.score.toFixed(1) ?? "-",
    좋아요: Review.likeCount ?? "-",
    작성일자: dayjs(Review.createdAt, "YYYYMMDD").format("YYYY.MM.DD") ?? "-",
  }));

  const onClickModal = (Review) => {
    return () => {
      setModal(!modal);
      setSelectedReview(Review);
    };
  };

  const onCloseModal = () => {
    setModal(false);
    setSelectedReview(null);
  };

  const onChange = (page) => {
    setPage(page);
  };

  const onClickManyDelete = async () => {
    const response = await deleteManyReviews();
    if (response.status === 204) {
      onGetReviews();
      onGetSelectReview();
      alert("삭제되었습니다.");
    }
  };

  const onClickDelete = async () => {
    const response = await deleteAdminReviews(id);
    if (response.status === 204) {
      onGetReviews();
      onGetSelectReview();
      alert("삭제되었습니다.");
    }
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

  useEffect(() => {
    onGetReviews();
    onGetSelectReview(id);
    onGetReviewsCount();
  }, [page, id]);

  return (
    <main className={styles.wrapper}>
      <h1>코멘트 관리 페이지</h1>
      <div className={styles.searchWrapper}>
        {/* <SearchInput
          value={user?.name}
          placeholder={"회원 닉네임을 검색하세요."}
        /> */}
        <Button color={"primary"} onClick={onClickManyDelete}>
          삭제
        </Button>
      </div>

      <Table
        columns={columns}
        data={data}
        firstButton={(Review) => (
          <Button color={"warning"} onClick={onClickModal(Review)}>
            보기
          </Button>
        )}
        secondButton={
          <Button color={"primary"} onClick={onClickDelete}>
            삭제
          </Button>
        }
      />
      <BoCommentModal
        reviewId={selectedReview}
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
