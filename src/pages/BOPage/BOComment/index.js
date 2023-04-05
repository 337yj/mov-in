import React, { useState, useEffect } from "react";

import {
  getReviewsMovie,
  getReviewsCount,
  getReviews,
} from "../../../api/Review";

import { Table, Button, Paging } from "../../../components";

import styles from "./boComment.module.scss";

const columns = [
  { Header: "닉네임", accessor: "닉네임" },
  { Header: "코멘트", accessor: "코멘트" },
  { Header: "평점", accessor: "평점" },
  { Header: "좋아요", accessor: "좋아요" },
  { Header: "작성일자", accessor: "작성일자" },
];

const POST_PER_PAGE = 10;

const BOComment = () => {
  const [comments, setComments] = useState([]);
  const [currentPage, setCurrentPage] = useState([]); // 보여줄 페이지
  const [page, setPage] = useState(1); // 현재 페이지
  const nextPage = page * POST_PER_PAGE;
  const PrevPage = nextPage - POST_PER_PAGE;
  const [totalCount, setTotalCount] = useState(0);

  const [modal, setModal] = useState(false);

  const data = comments.map((comment) => ({
    닉네임: comment.nickname,
    코멘트: comment.content,
    평점: comment.score.toFixed(1),
    좋아요: comment.likeCount,
    작성일자: dayjs(comment.createdAt, "YYYYMMDD").format("YYYY.MM.DD"),
  }));

  const onClickModal = () => {
    setModal(!modal);
  };

  const onChange = (page) => {
    setPage(page);
  };

  const onGetReviews = async () => {
    try {
      const response = await getReviews(page, POST_PER_PAGE);
      if (response.status === 200) {
        const newComments = [...response.data.data];
        setComments([...comments, ...newComments]); // 기존 데이터와 새로운 데이터를 합쳐서 저장
        setCurrentPage([...comments, ...newComments]); // 기존 데이터와 새로운 데이터를 합쳐서 현재 보여주는 데이터로 저장
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

  useEffect(() => {
    onGetReviews();
    onGetReviewsCount();
  }, [page]);

  return (
    <section className={styles.wrapper}>
      <h1>코멘트 관리 페이지</h1>
      <Table
        columns={columns}
        data={data}
        firstButton={
          <Button color={"warning"} children={"보기"} onclick={onClickModal} />
        }
        secondButton={<Button color={"primary"} children={"삭제"} />}
      />
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

export default BOComment;
