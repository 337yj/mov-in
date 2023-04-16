import React, { useState, useEffect } from "react";

import {
  getUsers,
  getUsersCount,
  deleteUser,
  getUsersDetail,
} from "../../../api/User";

import { SearchInput, Table, Button, Paging } from "../../../components/Common";
import { BoUserModal } from "../_shared";

import styles from "./boUser.module.scss";
import dayjs from "dayjs";

const columns = [
  { Header: "이름", accessor: "이름" },
  { Header: "닉네임", accessor: "닉네임" },
  { Header: "코멘트", accessor: "코멘트" },
  { Header: "좋아요", accessor: "좋아요" },
  { Header: "가입일자", accessor: "가입일자" },
];

const POST_PER_PAGE = 10;

const BOUser = ({ user }) => {
  const [users, setUsers] = useState([]);
  const [input, setInput] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [page, setPage] = useState(1); // 현재 페이지
  const [totalCount, setTotalCount] = useState(0);

  const [modal, setModal] = useState(false);

  const data = users.map((user) => ({
    이름: user.name ?? "-",
    닉네임: user.nickname ?? "-",
    코멘트: user.reviewCount ?? "-",
    좋아요: user.likeCount ?? "-",
    가입일자: dayjs(user.createdAt, "YYYYMMDD").format("YYYY.MM.DD"),
  }));

  const onClickModal = (user) => {
    return () => {
      setModal(!modal);
      selectedUser(user);
    };
  };

  const onCloseModal = () => {
    setModal(false);
    setSelectedUser(null);
  };

  const onChange = (page) => {
    setPage(page);
  };

  const onGetUsers = async () => {
    try {
      const response = await getUsers(page, POST_PER_PAGE);
      if (response.status === 200) {
        //NOTE: 페이지가 바뀌면 기존 데이터를 지우고 새로운 데이터를 추가
        setUsers(response.data.data);
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

  const onGetSelectedUser = async () => {
    try {
      const response = await getUsersDetail(id);
      if (response.status === 200) {
        setSelectedUser(response.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onChangeSearch = async () => {
    try {
      const response = await getUsers(e.target.value);
      if (response.status === 200) {
        setInput(response.data.data);
        setPage(1);
      }
      if (e.target.value === null) {
        setUsers(response.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onDeleteUser = async () => {
    try {
      const response = await deleteUser(id);
      if (response.status === 204) {
        onGetUsers();
      }
    } catch (error) {
      console.error(error);
    }

    const ids = selectedUser.join(",");
    deleteUser(ids);
  };

  useEffect(() => {
    onGetUsers();
    onGetUsersCount();
  }, [page]);

  console.log(users);

  return (
    <section className={styles.wrapper}>
      <h1>유저 관리 페이지</h1>
      <div>
        <SearchInput
          value={user?.name}
          placeholder={"회원 닉네임을 검색하세요."}
          onChange={onChangeSearch}
        />
        <Button color={"danger"} onclick={onDeleteUser}>
          탈퇴
        </Button>
      </div>
      <Table
        columns={columns}
        data={data}
        firstButton={(user) => (
          <Button color={"warning"} onclick={onClickModal(user)}>
            보기
          </Button>
        )}
        secondButton={
          <Button color={"danger"} onclick={onDeleteUser}>
            탈퇴
          </Button>
        }
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
