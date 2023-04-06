import React, { useState, useEffect } from "react";

import { getUsers, getUsersCount } from "../../../api/User";

import { Table, Button, Paging } from "../../../components/Common";
import { BoUserModal } from "../_shared";

import styles from "./boUser.module.scss";
import dayjs from "dayjs";

const columns = [
  { Header: "닉네임", accessor: "닉네임" },
  { Header: "코멘트", accessor: "코멘트" },
  { Header: "좋아요", accessor: "좋아요" },
  { Header: "가입일자", accessor: "가입일자" },
];

const POST_PER_PAGE = 10;

const BOUser = ({ user }) => {
  const [users, setUsers] = useState([]);
  // const [likeCount, setLikeCount] = useState([]);
  // const [commentCount, setCommentCount] = useState([]);
  const [currentPage, setCurrentPage] = useState([]); // 보여줄 페이지
  const [page, setPage] = useState(1); // 현재 페이지
  const nextPage = page * POST_PER_PAGE;
  const PrevPage = nextPage - POST_PER_PAGE;
  const [totalCount, setTotalCount] = useState(0);

  const [modal, setModal] = useState(false);

  const data = users.map((user) => ({
    닉네임: user.nickname ?? "-",
    코멘트: user.reviewCount ?? "-",
    좋아요: user.likeCount ?? "-",
    가입일자: dayjs(user.createdAt, "YYYYMMDD").format("YYYY.MM.DD"),
  }));

  const onClickModal = () => {
    setModal(!modal);
  };

  const onChange = (page) => {
    setPage(page);
  };

  const onGetUsers = async () => {
    try {
      const response = await getUsers(page, POST_PER_PAGE);
      if (response.status === 200) {
        const newUsers = [...response.data.data];
        //NOTE: 페이지가 바뀌면 기존 데이터를 지우고 새로운 데이터를 추가
        setUsers([...users, ...newUsers]);
        setCurrentPage([...users, ...newUsers]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onGetUsersCount = async () => {
    try {
      const response = await getUsersCount();
      if (response.status === 200) {
        setTotalCount(response.data.count);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    onGetUsers();
    onGetUsersCount();
  }, [page]);

  console.log(users);

  return (
    <section className={styles.wrapper}>
      <h1>유저 관리 페이지</h1>
      <Table
        columns={columns}
        data={data}
        firstButton={
          <Button color={"warning"} children={"보기"} onclick={onClickModal} />
        }
        secondButton={<Button color={"danger"} children={"탈퇴"} />}
      />
      <BoUserModal user={user} modal={modal} setModal={setModal} />
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

export default BOUser;
