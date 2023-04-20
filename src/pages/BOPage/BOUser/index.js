import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

import {
  deleteUser,
  getUsers,
  getUsersCount,
  getUsersDetail,
} from "../../../api/User";

import { Button, Paging, Table } from "../../../components/Common";
import { BoUserModal } from "../_shared";

import styles from "./boUser.module.scss";

const columns = [
  { Header: "이름", accessor: "이름" },
  { Header: "닉네임", accessor: "닉네임" },
  { Header: "코멘트", accessor: "코멘트" },
  { Header: "좋아요", accessor: "좋아요" },
  { Header: "가입일자", accessor: "가입일자" },
];

const POST_PER_PAGE = 10;

const BOUser = ({ user }) => {
  const { id } = useParams;

  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [totalCount, setTotalCount] = useState(0);

  const [modal, setModal] = useState(false);

  const data = users.map((user) => ({
    id: user.id,
    이름: user.name ?? "-",
    닉네임: user.nickname ?? "-",
    코멘트: user.reviewCount ?? "-",
    좋아요: user.likeCount ?? "-",
    가입일자: dayjs(user.createdAt, "YYYYMMDD").format("YYYY.MM.DD"),
  }));

  const onClickModal = (user) => {
    return () => {
      setModal(!modal);
      setSelectedUser(user);
    };
  };

  const onCloseModal = () => {
    setModal(!modal);
    setSelectedUser(null);
  };

  const onChange = (page) => {
    setPage(page);
  };

  const onClickDelete = async () => {
    if (response.status === 204) {
      await deleteUser(id);
      alert("탈퇴되었습니다.");
      await onGetUserDetail();
    }
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

  const onGetUserDetail = async () => {
    try {
      const response = await getUsersDetail(id);
      if (response.status === 200) {
        const data = response.data;
        setSelectedUser(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    onGetUsers();
    onGetUsersCount();
    onGetUserDetail(id);
  }, [page, id]);

  console.log({ selectedUser, users });

  return (
    <section className={styles.wrapper}>
      <h1>유저 관리 페이지</h1>
      <div className={styles.searchWrapper}>
        {/* <SearchInput
          value={user?.name}
          placeholder={"회원 닉네임을 검색하세요."}
        /> */}
      </div>
      <div className={styles.deleteWrapper}>
        <Button
          className={styles.deleteButton}
          color={"danger"}
          onClick={onClickDelete}
        >
          탈퇴
        </Button>
      </div>
      <Table
        columns={columns}
        data={data}
        firstButton={(user) => (
          <Button color={"warning"} onClick={onClickModal(user)}>
            보기
          </Button>
        )}
        secondButton={
          <Button color={"danger"} onClick={onClickDelete}>
            탈퇴
          </Button>
        }
      />
      <BoUserModal
        userId={selectedUser}
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
    </section>
  );
};
export default BOUser;
