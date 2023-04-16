import React, { useState, useEffect } from "react";

import {
  getReviewsMovie,
  getReviewsCount,
  getReviews,
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

const BOComment = ({ comment, checkItems }) => {
  const [comments, setComments] = useState([]);
  const [selectedComment, setSelectedComment] = useState(null);
  const [page, setPage] = useState(1); // 현재 페이지
  const [totalCount, setTotalCount] = useState(0);

  const [modal, setModal] = useState(false);

  const data = comments.map((comment) => ({
    닉네임: comment.nickname ?? "-",
    코멘트: comment.content ?? "-",
    평점: comment.score.toFixed(1) ?? "-",
    좋아요: comment.likeCount ?? "-",
    작성일자: dayjs(comment.createdAt, "YYYYMMDD").format("YYYY.MM.DD") ?? "-",
  }));

  const onClickModal = (comment) => {
    return () => {
      setModal(!modal);
      selectedComment(comment);
    };
  };

  const onCloseModal = () => {
    setModal(false);
    setSelectedComment(null);
  };

  const onChange = (page) => {
    setPage(page);
  };

  const onGetReviews = async () => {
    try {
      const response = await getReviews(page, POST_PER_PAGE);
      if (response.status === 200) {
        setComments(response.data.data);
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
    <main className={styles.wrapper}>
      <h1>코멘트 관리 페이지</h1>
      <div>
        <SearchInput placeholder={"회원 닉네임을 검색하세요."} />
        <Button color={"primary"} children={"삭제"} />
      </div>
      <Table
        columns={columns}
        data={data}
        firstButton={(comment) => (
          <Button color={"warning"} onclick={onClickModal(comment)}>
            보기
          </Button>
        )}
        secondButton={<Button color={"primary"}>삭제</Button>}
      />
      <BoCommentModal
        comment={selectedComment}
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
