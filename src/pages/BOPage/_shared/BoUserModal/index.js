import React, { useEffect, useState } from "react";

import { deleteUser, getUsersDetail, getUsersInfo } from "../../../../api/User";

import { Modal, Button } from "../../../../components";

import styles from "./boUserModal.module.scss";

const BoUserModal = ({ userId, modal, onCloseModal }) => {
  const [user, setUser] = useState(null);

  const onClickModal = () => {
    onCloseModal();
    setUser(null);
  };

  const onClickDelete = async () => {
    await deleteUser(id);
    alert("탈퇴되었습니다.");
  };

  const onGetUsersDetail = async () => {
    try {
      const response = await getUsersDetail(userId);
      if (response.status === 200) {
        setUser(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // const onGetUsersInFo = async () => {
  //   try {
  //     const response = await getUsersInfo(userId);
  //     if (response.status === 200) {
  //       setUser(response.data);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }

  console.log({ userId, user });

  useEffect(() => {
    onGetUsersDetail();
  }, [userId]);

  if (!user) {
    return null;
  }
  console.log({ userId, user });
  return (
    modal && (
      <Modal
        className={styles.boUserModal}
        user={user}
        title={"회원 관리"}
        onClick={onClickModal}
      >
        <form className={styles.wrapper}>
          <section className={styles.profileWrapper}>
            <figure>
              <img
                className={styles.profileImage}
                src={user?.profileImage}
                alt="thumbnail"
              />
              <Button color={"dark"}>{user?.likeCount}</Button>
              <Button color={"dark"}>{user?.reviewCount}</Button>
            </figure>

            <div className={styles.content}>
              <h4>닉네임</h4>
              <Input>{user?.nickname}</Input>
              <h4>이메일</h4>
              <Input>{user?.email}</Input>
              <h4>생년월일</h4>
              <Input>
                {dayjs(user?.birth, "YYYYMMDD").format("YYYY.MM.DD")}
              </Input>
              <h4>가입일자</h4>
              <Input>
                {dayjs(user?.createdAt, "YYYYMMDD").format("YYYY.MM.DD")}
              </Input>
            </div>
          </section>
          <div className={styles.buttonWrapper}>
            <Button
              className={styles.modify}
              color={"danger"}
              onClick={onClickDelete}
            >
              탈퇴
            </Button>
            <Button
              className={styles.cancel}
              color={"secondary"}
              onClick={onClickModal}
            >
              취소
            </Button>
          </div>
        </form>
      </Modal>
    )
  );
};

export default BoUserModal;
